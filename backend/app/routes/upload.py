from fastapi import APIRouter, UploadFile, File
import os
import shutil
import uuid

router = APIRouter()

UPLOAD_DIR = "app/data"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# simple in-memory registry (we improve later)
DATASETS = {}


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

    # register dataset
    DATASETS[file_id] = {
        "file_name": file.filename,
        "file_path": file_path,
        "file_type": file_extension
    }

    return {
        "message": "File uploaded successfully",
        "file_id": file_id,
        "file_name": file.filename,
        "file_type": file_extension
    }