from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from config.database import Base
from datetime import datetime
from .reviewmodels import ReviewModel


# {
#     "name": "ZEBRONICS Zeb-Yoga 101 Bluetooth Headset  (Red, In the Ear)",
#     "image": "https://rukminim1.flixcart.com/image/416/416/khp664w0-0/headphone/p/d/k/zeb-yoga-101-zebronics-original-imafxnkdwzt4gzhg.jpeg?q=70",
#     "category": "electronics",
#     "description": "kentang",
#     "price": 3000,
#     "countInStock": 4,
#     "rating": 3
# }


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

