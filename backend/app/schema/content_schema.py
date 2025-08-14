from pydantic import BaseModel, Field, HttpUrl


class ContentCreateRequest(BaseModel):
  title: str = Field(..., min_length=1)
  description: str = Field(..., min_length=1)
  types: str = Field(..., min_length=1)
  tags: str = Field(..., min_length=1)
  link: HttpUrl