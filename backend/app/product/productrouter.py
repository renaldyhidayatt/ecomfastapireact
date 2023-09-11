from fastapi import APIRouter, Depends, Response
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from dto.productschema import ProductSchema
from config.database import get_db
import csv

from .productservice import ProductService

router = APIRouter(prefix="/product", tags=["Products"])


@router.get("/")
def getallProduct(db: Session = Depends(get_db)):

    return ProductService.get_all_product(db=db)

@router.get("/recommendation")
def get_recommendation(db: Session = Depends(get_db)):
    return ProductService.recommend_products(db);

@router.get("/export-csv")
def export_csv(db: Session = Depends(get_db)):
    products = ProductService.get_all_product(db=db)
   
    csv_data = "ID,Name,Description,Category,Price,Rating,CountInStock,Image\n"
    
    # Tulis data produk ke dalam format CSV
    for product in products:
        csv_data += f"{product.id},{product.name},{product.description},{product.category},{product.price},{product.rating},{product.countInStock},{product.image}\n"

    # Buat StreamingResponse dengan data CSV
    response = StreamingResponse(content=iter([csv_data]), media_type="text/csv")
    response.headers["Content-Disposition"] = 'attachment; filename="products.csv"'

    return response


@router.post("/")
def createProduct(request: ProductSchema, db: Session = Depends(get_db)):
    return ProductService.create_product(request=request, db=db)


@router.get("/{productid}")
def showProduct(productid: int, db: Session = Depends(get_db)):
    return ProductService.show_product(productid=productid, db=db)


@router.put("/{productid}")
def updateProduct(
    productid: int, request: ProductSchema, db: Session = Depends(get_db)
):
    return ProductService.update_product(productid=productid, request=request, db=db)


@router.delete("/{productid}")
def deleteProduct(productid: int, db: Session = Depends(get_db)):
    return ProductService.delete_product(productid=productid, db=db)


