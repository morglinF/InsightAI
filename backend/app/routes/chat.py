import pandas as pd
from fastapi import APIRouter

from app.services.file_registry import DATASETS
from app.services.insight_engine import generate_basic_insights
from app.services.llm_engine import generate_llm_response
from fastapi.responses import StreamingResponse
from app.services.llm_engine import stream_llm_response

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

    # LLM reasoning
    result = generate_llm_response(question, insights)

    return {
        "question": question,
        "answer": result["response"],
        "cached": result["cached"],
        "file_used": dataset["original_name"]
    }

    @router.post("/chat-stream")
    def chat_stream(file_id: str, question: str):

        db = SessionLocal()

        dataset = db.query(Dataset).filter(
            Dataset.file_id == file_id
        ).first()

        if not dataset:
            return {"error": "File not found"}

        # load csv
        df = pd.read_csv(dataset.file_path)

        # insights
        insights = generate_basic_insights(df)

        # stream response
        generator = stream_llm_response(question, insights)

        return StreamingResponse(
            generator,
            media_type="text/plain"
        )