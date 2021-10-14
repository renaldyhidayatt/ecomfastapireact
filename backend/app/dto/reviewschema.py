from pydantic import BaseModel


class ReviewCreate(BaseModel):
    rating: int
    comment: str

