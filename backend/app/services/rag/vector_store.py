from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

embeddings = OpenAIEmbeddings()

VECTOR_DB = Chroma(
    collection_name="insightai",
    embedding_function=embeddings,
    persist_directory="app/chroma_db"
)