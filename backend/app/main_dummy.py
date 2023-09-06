from models.productmodels import ProductModel
from models.reviewmodels import ReviewModel
from models.usermodels import User
from config.database import SessionLocal, engine, Base
from datetime import datetime

Base.metadata.create_all(bind=engine)
session = SessionLocal()

products = [
    ProductModel(
        name="Product 1",
        image="https://rukminim1.flixcart.com/image/416/416/khp664w0-0/headphone/p/d/k/zeb-yoga-101-zebronics-original-imafxnkdwzt4gzhg.jpeg?q=70",
        category="Category 1",
        description="Electronic",
        price=100,
        countInStock=10,
        rating=4
    ),
    ProductModel(
        name="Product 2",
        image="https://cdn.shopclues.com/images/detailed/82712/136145929-82712763-1523704602.jpg",
        category="Jam",
        description="Description 2",
        price=150,
        countInStock=15,
        rating=4
    ),
   
]

for product in products:
    session.add(product)

# Seeding data pengguna
users = [
    User(
        name="User 1",
        email="user1@example.com",
        password="password1",
        is_staff=False,
        is_active=True
    ),
    User(
        name="User 2",
        email="user2@example.com",
        password="password2",
        is_staff=False,
        is_active=True
    ),
    # Tambahkan data pengguna lainnya di sini
]

for user in users:
    session.add(user)

# Seeding data ulasan
reviews = [
    ReviewModel(
        name="User 1",
        comment="Good product!",
        rating=4,
        user_id=1,  # Sesuaikan dengan ID pengguna yang sesuai
        product_id=1,  # Sesuaikan dengan ID produk yang sesuai
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    ),
    ReviewModel(
        name="User 2",
        comment="I love it!",
        rating=5,
        user_id=2,  # Sesuaikan dengan ID pengguna yang sesuai
        product_id=1,  # Sesuaikan dengan ID produk yang sesuai
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    ),
    # Tambahkan data ulasan lainnya di sini
]

for review in reviews:
    session.add(review)

# Commit perubahan ke database
session.commit()

# Tutup sesi
session.close()