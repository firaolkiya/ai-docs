# src/routes/search_history.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List,Optional
from datetime import datetime
from src.database import get_db
from src.models.search_history import SearchHistory
from src.auth import get_current_active_user  # assumes you have auth module for token-based user
from bson import ObjectId
from src.services.rag_service import rag_service
router = APIRouter(prefix="/search", tags=["search"])

# Create a search history entry
@router.post("/", response_model=SearchHistory)
async def create_search_history(
    message: str,
    openai_api_key:Optional[str]=None,
    current_user = Depends(get_current_active_user)
):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")

    entry_id = str(ObjectId())
    now = datetime.utcnow()


    if not openai_api_key:
        stored_api_key=current_user.openai_api_key if hasattr(current_user, "openai_api_key") else ""
        if not stored_api_key:
            raise HTTPException(status_code=500, detail="You don't have api key")
        response = await rag_service.query_question(current_user,message,stored_api_key)
        search_history = SearchHistory(
            id=entry_id,
            openai_api_key=stored_api_key,
            response=response['answer'],
            user_id=current_user.id,
            search_message=message,
            created_at=now,
            updated_at=now
        )
    else:
        response = await rag_service.query_question(current_user,message,openai_api_key)
        search_history = SearchHistory(
            id=entry_id,
            openai_api_key=openai_api_key,
            response=response['answer'],
            user_id=current_user.id,
            search_message=message,
            created_at=now,
            updated_at=now
        )
    await db.search_history.insert_one(search_history.dict())
    return search_history


# Get all search history for the current user
@router.get("/", response_model=List[SearchHistory])
async def get_user_search_history(
    current_user = Depends(get_current_active_user)
):
    db = get_db()
    histories = await db.search_history.find({"user_id": current_user.id}).to_list(100)
    return [SearchHistory(**h) for h in histories]

# Get a specific search history entry by id
@router.get("/{history_id}", response_model=SearchHistory)
async def get_search_history(history_id: str, current_user = Depends(get_current_active_user)):
    db = get_db()
    history = await db.search_history.find_one({"id": history_id, "user_id": current_user.id})
    if not history:
        raise HTTPException(status_code=404, detail="Search history not found")
    return SearchHistory(**history)
