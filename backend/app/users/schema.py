from pydantic import BaseModel
from typing import Optional


class RegisterUser(BaseModel):
    name: str
    email: str
    password: str
    is_staff: Optional[bool]
    is_active: Optional[bool]
