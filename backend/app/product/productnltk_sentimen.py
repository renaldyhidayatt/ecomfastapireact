from fastapi import Depends, HTTPException, status
from sqlalchemy.orm.session import Session
from config.database import get_db
from models.productmodels import ProductModel, ReviewModel
from dto.productschema import ProductSchema
from config.hashing import Hashing
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Unduh dataset vader_lexicon
nltk.download('vader_lexicon')

# Buat objek SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

def show_product(productid: int, db: Session):
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
