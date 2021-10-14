from sqlalchemy import Column, Integer, String
from sqlalchemy.sql.sqltypes import Boolean, DateTime
from config.database import Base
from datetime import datetime


class OrderModel(Base):
    __tablename__ = "order"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(30))
    email = Column(String(30))
    orderAmount = Column(Integer)
    transactionId = Column(String)
    isDelivered = Column(Boolean)
    user_id = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


class ShippingAddressModel(Base):
    __tablename__ = "shipping"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String)
    postalCode = Column(Integer)
    country = Column(String)
    city = Column(String)
    order_id = Column(Integer)


class OrderItemsModel(Base):
    __tablename__ = "orderitems"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    quantity = Column(Integer)
    price = Column(Integer)
    order_id = Column(Integer)

