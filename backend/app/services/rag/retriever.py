from app.services.rag.vector_store import VECTOR_DB

def retrieve_context(question, file_id):

    docs = VECTOR_DB.similarity_search(
        question,
        k=4,
        filter={
            "file_id": file_id
        }
    )

    return "\n\n".join(
        [doc.page_content for doc in docs]
    )