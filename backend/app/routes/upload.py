from fastapi import APIRouter, UploadFile, File
import os
import shutil
import uuid

from app.models.dataset import Dataset
from app.services.file_registry import DATASETS
from app.database import SessionLocal

from app.services.rag.ingest import ingest_csv

router = APIRouter()

UPLOAD_DIR = "app/data"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    ALLOWED_TYPES = ["csv", "pdf", "txt"]
    
    # detect file type
    file_extension = file.filename.split(".")[-1]

    if file_extension not in ALLOWED_TYPES:
        return {"error": "Unsupported file type"}

    # save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_extension = file.filename.split(".")[-1].lower()

    db = SessionLocal()

    # register dataset
    DATASETS[file_id] = {
        "file_name": file.filename,
        "file_path": file_path,
        "file_type": file_extension
    }

    dataset = Dataset(
    file_id=file_id,
    file_path=file_path,
    original_name=file.filename
)

    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    ingest_csv(file_path, dataset.file_id)

    return {
        "message": "File uploaded successfully",
        "file_id": file_id,
        "file_name": file.filename,
        "file_type": file_extension
    }