from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class SearchHistory(BaseModel):
    id: str = Field(..., description="Unique identifier for the search history")
    openai_api_key: str = Field(..., description="OpenAI API key used for the search")
    user_id: str = Field(..., description="Associated user ID")
    search_message: str = Field(..., description="The message or query sent by the user")
    response: str = Field(..., description="The response from the user")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Creation timestamp")
    updated_at: Optional[datetime] = Field(default=None, description="Last updated timestamp")
