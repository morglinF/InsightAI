import json
import pandas as pd
from fastapi import APIRouter

from app.schemas.chat import ChatRequest
from app.database import SessionLocal
from app.models.dataset import Dataset
from app.models.insight import Insight

from app.services.file_registry import DATASETS
from app.services.insight_engine import generate_basic_insights
from app.services.llm_engine import generate_llm_response
from fastapi.responses import StreamingResponse
from app.services.llm_engine import stream_llm_response
from app.services.insight_engine import generate_ai_insight

from app.services.rag.retriever import retrieve_context

router = APIRouter()


@router.post("/chat")
def chat(file_id: str, question: str):

    # lookup uploaded file
    dataset = DATASETS.get(file_id)

    if not dataset:
        return {"error": "File not found"}

    file_path = dataset["file_path"]

    # load dataframe
    df = pd.read_csv(file_path)

    # generate insights
    insights = generate_basic_insights(df)

    # persist insights
    try:
        db = SessionLocal()
        ins = Insight(file_id=file_id, insight=json.dumps(insights))
        db.add(ins)
        db.commit()
        db.refresh(ins)
    except Exception:
        pass

    # LLM reasoning
    result = generate_llm_response(question, insights)

    return {
        "question": question,
        "answer": result["response"],
        "cached": result["cached"],
        "file_used": dataset["original_name"]
    }

@router.post("/chat-stream")
def chat_stream(request: ChatRequest):

    try:
        file_id = request.file_id
        question = request.question

        db = SessionLocal()

        # 1. GET DATASET
        dataset = db.query(Dataset).filter(
            Dataset.file_id == file_id
        ).first()

        if not dataset:
            return {"error": "File not found"}

        # 2. LOAD CSV
        df = pd.read_csv(dataset.file_path)

        # 3. GENERATE STRUCTURED INSIGHTS
        insights = generate_basic_insights(df)

        # 4. GENERATE AI INTERPRETED INSIGHT
        ai_insight = generate_ai_insight(insights)

        # 5. SAVE STRUCTURED INSIGHTS (HISTORY TABLE)
        try:
            ins = Insight(
                file_id=file_id,
                insight=json.dumps(insights)
            )
            db.add(ins)
            db.commit()
            db.refresh(ins)
        except Exception as e:
            print("INSIGHT SAVE ERROR:", repr(e))

        # 6. SAVE LATEST AI INSIGHT TO DATASET (IMPORTANT FIX)
        dataset.latest_ai_insight = ai_insight

        db.add(dataset)
        db.commit()
        db.refresh(dataset)

        context = retrieve_context(
            question,
            file_id)


        print("QUESTION:", question , flush = True)
        print("CONTEXT:", context, flush = True)

        # 7. STREAM CHAT RESPONSE
        generator = stream_llm_response(
            question,
            context
        )

        return StreamingResponse(
            generator,
            media_type="text/plain"
        )

    except Exception as e:
        print("CHAT STREAM ERROR:", repr(e))

        return {
            "error": str(e)
        }
    
@router.get("/latest-insight/{file_id}")
def latest_insight(file_id: str):

    db = SessionLocal()

    dataset = db.query(Dataset).filter(
        Dataset.file_id == file_id
    ).first()

    latest_insight = (
        db.query(Insight)
        .filter(Insight.file_id == file_id)
        .order_by(Insight.created_at.desc())
        .first()
    )

    return {
        "ai_insight": dataset.latest_ai_insight if dataset else None,
        "analytics": json.loads(latest_insight.insight)
        if latest_insight else None
    }

@router.get("/insights")
def get_insights(file_id: str = None):

    db = SessionLocal()

    query = db.query(Insight)

    if file_id:
        query = query.filter(Insight.file_id == file_id)

    items = query.order_by(Insight.created_at.desc()).all()

    results = []

    for it in items:
        try:
            payload = json.loads(it.insight) if it.insight else None
        except Exception:
            payload = it.insight

        results.append({
            "id": it.id,
            "file_id": it.file_id,
            "insight": payload,
            "created_at": it.created_at.isoformat() if it.created_at else None,
        })

    return results
