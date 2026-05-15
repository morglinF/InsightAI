from app.services.llm_engine import generate_llm_response
from app.services.insight_engine import generate_basic_insights
import pandas as pd
from fastapi import APIRouter

router = APIRouter()


@router.post("/chat")
def chat(file_path: str, question: str):

    df = pd.read_csv(file_path)

    insights = generate_basic_insights(df)

    result = generate_llm_response(question, insights)

    return {
        "question": question,
        "answer": result["response"],
        "cached": result["cached"],
        "insights_used": insights
    }