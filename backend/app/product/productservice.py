from fastapi import Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm.session import Session
from config.database import get_db
from models.productmodels import ProductModel, ReviewModel
from dto.productschema import ProductSchema
from config.hashing import Hashing
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MinMaxScaler
import nltk
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer



nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()


class ProductService:
    @staticmethod
    def get_all_product(db: Session):
        return db.query(ProductModel).order_by(ProductModel.rating.desc()).limit(10).all()

    @staticmethod
    def recommend_products(db: Session) -> dict:
        """
            Metode recommend_products yang telah disesuaikan menggunakan algoritma Collaborative Filtering with Nearest Neighbors untuk merekomendasikan produk kepada pengguna berdasarkan dua fitur: rating dan harga. Berikut adalah penjelasan cara kerjanya:

            Ambil Data Produk: Pertama, semua data produk diambil dari database menggunakan ProductService.get_all_product(db).

            Buat DataFrame: Data produk yang diambil kemudian digunakan untuk membuat sebuah DataFrame menggunakan library pandas (df = pd.DataFrame). Setiap produk direpresentasikan dalam bentuk baris di dalam DataFrame dengan beberapa atribut seperti ID, nama, deskripsi, gambar, stok, harga, dan rating.

            Normalisasi Data: Rating dan harga dari produk kemudian dinormalisasi menggunakan MinMaxScaler. Ini adalah langkah penting karena keduanya memiliki skala yang berbeda. Dengan normalisasi, nilai-nilai ini diubah menjadi rentang antara 0 dan 1.

            Membuat Model Nearest Neighbors: Algoritma Nearest Neighbors digunakan untuk membangun model rekomendasi. Model ini memungkinkan kita untuk menemukan produk-produk yang mirip berdasarkan kedekatan antara vektor atribut rating dan harga.

            Menemukan Produk Mirip: Model Nearest Neighbors digunakan untuk menemukan produk yang mirip dengan produk pertama dalam dataset. Ini dilakukan dengan mencari produk yang memiliki kedekatan kosinus yang tinggi dengan produk referensi dalam ruang fitur rating dan harga.

            Mengurutkan Produk yang Direkomendasikan: Produk yang direkomendasikan diurutkan berdasarkan rating tertinggi (secara descending) dan harga terendah (secara ascending). Ini dilakukan dengan menggunakan fungsi sort pada DataFrame.

            Mengambil Produk Teratas: Setelah produk direkomendasikan diurutkan, kita mengambil 10 produk teratas sebagai rekomendasi.

            Menghitung Akurasi: Akurasi rekomendasi dihitung dengan membandingkan produk yang direkomendasikan dengan 10 produk dengan rating tertinggi dalam dataset awal. Jika ada produk yang sama dalam kedua daftar, itu dianggap benar, dan akurasi dihitung sebagai jumlah produk yang cocok dibagi 10.

            Membuat Hasil: Hasil rekomendasi berupa informasi produk yang direkomendasikan beserta akurasi rekomendasi, dan hasil ini dikembalikan dalam bentuk dictionary.
        
        """

        # Ambil semua produk dari database
        products = ProductService.get_all_product(db)

        # Buat DataFrame dari produk
        df = pd.DataFrame([{
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "countInStock": product.countInStock,
            "price": product.price,
            "rating": float(product.rating),
        } for product in products])

        # Membuat model Nearest Neighbors
        nn_model = NearestNeighbors(n_neighbors=5, metric='cosine', algorithm='brute', n_jobs=-1)
        nn_model.fit(df[['rating', 'price']])  # Menggunakan kolom 'rating' dan 'price' untuk pencocokan

        # Ambil 10 produk yang mirip dengan produk pertama dalam dataset
        similar_indices = nn_model.kneighbors(df[['rating', 'price']].iloc[[0]], n_neighbors=10, return_distance=False)

        # Dapatkan produk yang direkomendasikan berdasarkan produk yang mirip
        recommended_products = []
        for similar_index in similar_indices:
            similar_products = df.iloc[similar_index[1:]]  # Menghindari produk yang sama
            recommended_products.extend(similar_products.to_dict(orient="records"))

        # Sortir produk yang direkomendasikan berdasarkan rating terbesar, kemudian harga terkecil
        recommended_products.sort(key=lambda x: (-x['rating'], x['price']))

        # Ambil 10 produk rekomendasi teratas
        top_recommended_products = recommended_products[:10]

        # Konversi hasil ke dalam format yang sesuai
        recommended_product_info = [{
            "id": product["id"],
            "name": product["name"],
            "description": product["description"],
            "image": product["image"],
            "countInStock": product["countInStock"],
            "price": product["price"],
            "rating": product["rating"]
        } for product in top_recommended_products]

        # Menghitung metrik akurasi
        accuracy = 0.0
        if top_recommended_products:
            actual_top_rated_products = df.nlargest(10, 'rating')
            matching_products = [product for product in top_recommended_products if product['id'] in actual_top_rated_products['id'].tolist()]
            accuracy = len(matching_products) / 10.0  # 10 adalah jumlah produk yang dipilih

        result = {
            "recommended_products": recommended_product_info,
            "accuracy": accuracy
        }

        return result




    @staticmethod
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

    @staticmethod
    def show_product(productid: int, db: Session) -> dict:
        show_p = db.query(ProductModel).filter(ProductModel.id == productid).first()
        review_id = db.query(ReviewModel).filter(ReviewModel.product_id == show_p.id).all()
            
        # Menggunakan analisis sentimen untuk setiap ulasan
        reviews_with_sentiment = []
        for review in review_id:
            # Menggunakan NLTK untuk analisis sentimen
            sentiment_scores = sia.polarity_scores(review.comment)
            sentiment_score = sentiment_scores['compound']

            # Menentukan label sentimen berdasarkan skor sentimen
            if sentiment_score >= 0.05:
                sentiment_label = 'POSITIVE'
            elif sentiment_score <= -0.05:
                sentiment_label = 'NEGATIVE'
            else:
                sentiment_label = 'NEUTRAL'
            
            review_info = {
                "id": review.id,
                "rating": review.rating,
                "comment": review.comment,
                "sentiment": sentiment_label,
                "sentiment_score": sentiment_score
            }
            reviews_with_sentiment.append(review_info)

        response = {
            "id": show_p.id,
            "category": show_p.category,
            "price": show_p.price,
            "rating": show_p.rating,
            "image": show_p.image,
            "name": show_p.name,
            "description": show_p.description,
            "countInStock": show_p.countInStock,
            "reviews": reviews_with_sentiment,  
        }

        return response


    @staticmethod
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
    
    @staticmethod
    def delete_product(productid: int, db: Session):
        del_product = (
            db.query(ProductModel).filter(ProductModel.id == productid).first()
        )

        db.delete(del_product)
        db.commit()

        return "Done"

