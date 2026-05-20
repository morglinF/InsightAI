from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base
from datetime import datetime


class Insight(Base):

    __tablename__ = "insights"

    id = Column(Integer, primary_key=True, index=True)

    file_id = Column(String, index=True)

    insight = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)
