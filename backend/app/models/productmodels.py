from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from config.database import Base
from datetime import datetime
from .reviewmodels import ReviewModel




class ProductModel(Base):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True)
    name = Column(String(200))
    image = Column(String(200))
    category = Column(String(25))
    description = Column(String(255))
    price = Column(Integer)
    countInStock = Column(Integer)
    rating = Column(Integer)

    reviews_user = relationship("ReviewModel", back_populates="product")

