from fastapi import APIRouter, UploadFile, File
import os
import shutil
import uuid

from app.services.file_registry import DATASETS

router = APIRouter()

UPLOAD_DIR = "app/data"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_id = str(uuid.uuid4())

    file_extension = file.filename.split(".")[-1].lower()

    stored_filename = f"{file_id}.{file_extension}"

    file_path = os.path.join(UPLOAD_DIR, stored_filename)

    # save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # store metadata
    DATASETS[file_id] = {
        "file_id": file_id,
        "original_name": file.filename,
        "stored_name": stored_filename,
        "file_path": file_path,
        "file_type": file_extension
    }

    return {
        "message": "Upload successful",
        "file": DATASETS[file_id]
    }