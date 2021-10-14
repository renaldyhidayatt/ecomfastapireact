from fastapi import Depends, HTTPException, status
from sqlalchemy.orm.session import Session
from config.database import get_db
from models.productmodels import ProductModel, ReviewModel
from dto.productschema import ProductSchema
from config.hashing import Hashing


class ProductService:
    def get_all_product(db: Session):
        return db.query(ProductModel).all()

    def create_product(request: ProductSchema, db: Session):
        new_product = ProductModel(
            name=request.name,
            image=request.image,
            category=request.category,
            description=request.description,
            price=request.price,
            countInStock=request.countInStock,
            rating=request.rating,
        )

        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        return new_product

    def show_product(productid: int, db: Session):
        show_p = db.query(ProductModel).filter(ProductModel.id == productid).first()
        review_id = (
            db.query(ReviewModel).filter(ReviewModel.product_id == show_p.id).all()
        )

        response = {
            "id": show_p.id,
            "category": show_p.category,
            "price": show_p.price,
            "rating": show_p.rating,
            "image": show_p.image,
            "name": show_p.name,
            "description": show_p.description,
            "countInStock": show_p.countInStock,
            "reviews": review_id,
        }

        return response

    # Lanjutlagi
    def update_product(productid: int, request: ProductSchema, db: Session):
        product_id = db.query(ProductModel).filter(ProductModel.id == productid).first()

        product_id.name = request.name
        product_id.image = request.image
        product_id.category = request.category
        product_id.description = request.description
        product_id.price = request.price
        product_id.countInStock = request.countInStock
        product_id.rating = request.rating
        db.commit()

        return product_id

    def delete_product(productid: int, db: Session):
        del_product = (
            db.query(ProductModel).filter(ProductModel.id == productid).first()
        )

        db.delete(del_product)
        db.commit()

        return "Done"

