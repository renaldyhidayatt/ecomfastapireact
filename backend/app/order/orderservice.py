import os
import stripe
from sqlalchemy.orm import Session
from fastapi import Depends
from dto.orderschema import OrderCreatePlaceOrder
from models.ordermodels import OrderModel, OrderItemsModel, ShippingAddressModel

# from uuid import uuid4


stripe.api_key = os.environ("STRIPE_KEY")


class OrderService:
    def getAll(db: Session):
        return db.query(OrderModel).all()

    def createOrderPlace(request: OrderCreatePlaceOrder, db: Session):

        customer = stripe.Customer.create(
            email=request.token.email, source=request.token.id
        )

        payment = stripe.Charge.create(
            amount=request.subtotal * 1000,
            currency="MYR",
            customer=customer.id,
            receipt_email=request.token.email,
        )

        if payment:
            order_create = OrderModel(
                user_id=request.currentUser.id,
                name=request.currentUser.name,
                email=request.currentUser.email,
                orderAmount=request.subtotal,
            )

            db_orderid = (
                db.query(OrderModel)
                .filter(OrderModel.user_id == request.currentUser.id)
                .first()
            )

            shipping_a = ShippingAddressModel(
                address=request.token.card.address_line1,
                city=request.token.card.address_city,
                country=request.token.card.address_country,
                postalCode=request.token.card.address_zip,
                order_id=db_orderid.id,
            )

            for dic in request.cartItems:
                order_item_a = OrderItemsModel(
                    name=dic.name,
                    quantity=dic.quantity,
                    price=dic.price,
                    order_id=db_orderid.id,
                )

            db.add(order_item_a)
            db.add(shipping_a)
            db.add(order_create)
            db.commit()
        else:
            print("Salah")

        return request

    def getOrderById(id: int, db: Session):
        order_byid = db.query(OrderModel).filter(OrderModel.id == id).first()

        orderItembyid = (
            db.query(OrderItemsModel).filter(OrderItemsModel.id == order_byid.id).all()
        )
        shippingByid = (
            db.query(ShippingAddressModel)
            .filter(ShippingAddressModel.id == order_byid.id)
            .first()
        )

        response = {
            "name": order_byid.name,
            "email": order_byid.email,
            "orderAmount": order_byid.orderAmount,
            "transactionId": order_byid.transactionId,
            "isDelivered": order_byid.isDelivered,
            "user_id": order_byid.user_id,
            "created_at": order_byid.created_at,
            "updated_at": order_byid.updated_at,
            "orderItems": orderItembyid,
            "shippingAddress": shippingByid,
        }

        return response

    def getOrderByUserId(userid: int, db: Session):
        order_by_userid = (
            db.query(OrderModel).filter(OrderModel.user_id == userid).all()
        )

        return order_by_userid

