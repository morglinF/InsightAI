import pandas as pd


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

    return insights 