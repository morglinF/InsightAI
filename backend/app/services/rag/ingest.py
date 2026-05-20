import pandas as pd

from app.services.rag.chunker import chunk_text
from app.services.rag.vector_store import VECTOR_DB


def ingest_csv(file_path, file_id):

    df = pd.read_csv(file_path)

    text = df.to_string()

    chunks = chunk_text(text)

    metadatas = [
        {
            "file_id": file_id
        }
        for _ in chunks
    ]

    VECTOR_DB.add_texts(
        texts=chunks,
        metadatas=metadatas
    )