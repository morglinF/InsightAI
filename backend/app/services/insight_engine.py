import json

import pandas as pd
import numpy as np

from openai import OpenAI
import hashlib
import json

from pandas.api.types import (
    is_object_dtype,
    is_string_dtype
)

client = OpenAI()


def clean_value(value):

    if isinstance(value, (np.integer,)):
        return int(value)

    if isinstance(value, (np.floating,)):
        return float(value)

    return value


def generate_basic_insights(df):

    insights = {}

    # dataset overview
    insights["row_count"] = len(df)
    insights["column_count"] = len(df.columns)

    # numeric analysis
    numeric_cols = df.select_dtypes(include=["number"]).columns

    insights["totals"] = {}
    insights["averages"] = {}

    for col in numeric_cols:

        insights["totals"][col] = clean_value(df[col].sum())

        insights["averages"][col] = clean_value(
            round(df[col].mean(), 2)
        )

    # categorical analysis
    insights["top_categories"] = {}

    for col in df.columns:

        if ( is_object_dtype(df[col]) or is_string_dtype(df[col])):

            top_values = (
                df[col]
                .value_counts()
                .head(5)
                .to_dict()
            )

            insights["top_categories"][col] = {
                str(k): clean_value(v)
                for k, v in top_values.items()
            }

    # missing values
    insights["missing_values"] = {
        col: int(df[col].isna().sum())
        for col in df.columns
    }

    return insights


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
