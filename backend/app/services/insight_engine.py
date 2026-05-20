import json

import pandas as pd
import numpy as np

from openai import OpenAI
import hashlib
import json

client = OpenAI()


def generate_basic_insights(df: pd.DataFrame):
    insights = {}

    # numeric columns only
    numeric_cols = df.select_dtypes(include=['number']).columns

    # categorical columns
    categorical_cols = df.select_dtypes(include=['object']).columns

    # basic stats
    insights["row_count"] = len(df)
    insights["columns"] = list(df.columns)

    # numeric summaries
    insights["numeric_summary"] = {}

    for col in numeric_cols:
        insights["numeric_summary"][col] = {
            "sum": df[col].sum(),
            "mean": df[col].mean(),
            "max": df[col].max(),
            "min": df[col].min()
        }

    # top categories
    insights["categorical_summary"] = {}

    for col in categorical_cols:
        insights["categorical_summary"][col] = df[col].value_counts().head(5).to_dict()

    return clean_for_json(insights )



def clean_for_json(obj):

    if isinstance(obj, dict):
        return {
            k: clean_for_json(v)
            for k, v in obj.items()
        }

    elif isinstance(obj, list):
        return [
            clean_for_json(v)
            for v in obj
        ]

    elif isinstance(obj, np.integer):
        return int(obj)

    elif isinstance(obj, np.floating):
        return float(obj)

    elif isinstance(obj, pd.Timestamp):
        return obj.isoformat()

    return obj

def generate_ai_insight(insights):

    prompt = f"""
    You are an expert business intelligence analyst.

    Analyze the dataset insights below and generate:

    - key trends
    - anomalies
    - customer behavior insights
    - operational insights
    - important business observations

    Speak naturally and professionally.

    DATA:
    {json.dumps(insights, indent=2)}
    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.7,
    )

    return response.choices[0].message.content
