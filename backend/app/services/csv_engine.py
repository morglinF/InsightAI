import pandas as pd


def load_csv(file_path: str):
    return pd.read_csv(file_path)


def profile_dataframe(df: pd.DataFrame):
    """
    Dynamically understand ANY CSV structure
    """

    profile = {
        "rows": len(df),
        "columns": list(df.columns),
        "column_types": df.dtypes.astype(str).to_dict(),
        "missing_values": df.isnull().sum().to_dict(),
    }

    return profile