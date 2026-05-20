from sqlalchemy import Column, Integer, String,Text
from app.database import Base


class Dataset(Base):

    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)

    file_id = Column(String, unique=True, index=True)

    file_path = Column(String)

    original_name = Column(String)

    latest_ai_insight = Column(Text, nullable=True)