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
        price=50,
        countInStock=10,
        rating=5
    ),# 1
    ProductModel(
        name="Product 2",
        image="https://cdn.shopclues.com/images/detailed/82712/136145929-82712763-1523704602.jpg",
        category="Jam",
        description="Description 2",
        price=100,
        countInStock=15,
        rating=5
    ), # 2
    ProductModel(
        name="SAMSUNG Crystal Vision 4K iSmart Series 138 cm (55 inch) Ultra HD (4K) LED Smart Tizen TV 2023 Edition with Voice Assistant ",
        image="https://rukminim2.flixcart.com/image/416/416/xif0q/television/t/6/6/-original-imags2ygjnxgvmga.jpeg?q=70",
        category="TV",
        description="Description 3",
        price=120,
        countInStock=15,
        rating=1
    ), # 3
    ProductModel(
        name="Mi A series 80 cm (32 inch) HD Ready LED Smart Google TV 2023 Edition with 1.5 GB RAM and Dolby Audio (2023 Model) ",
        image="https://rukminim2.flixcart.com/image/416/416/xif0q/television/b/s/o/-original-imagt86kchfhpwgz.jpeg?q=70",
        category="TV",
        description="Description 3",
        price=110,
        countInStock=15,
        rating=5,
    ), # 4
    ProductModel(
        name="Lenovo 23.8 inch Full HD VA Panel 3-Side Near Edgeless with TUV Eye Care Monitor (D24-20)  (Response Time: 4 ms, 75 Hz Refresh Rate) ",
        image="https://rukminim2.flixcart.com/image/416/416/ko8xtow0/monitor/t/a/y/d24-20-66aekac1in-lenovo-original-imag2qwzazcdmqtb.jpeg?q=70",
        category="TV",
        description="Description 3",
        price=500,
        countInStock=15,
        rating=2
    ), # 5
    ProductModel(
        name="Frontech 19 inch Full HD LED Backlit TN Panel Monitor (MON-0071)  (Response Time: 2 ms)",
        image="https://rukminim2.flixcart.com/image/416/416/xif0q/monitor/f/q/b/mon-0071-full-hd-19-2023-mon-0071-frontech-original-imags24baggzgfuy.jpeg?q=70",
        category="Monitor",
        description="Description 3",
        price=90,
        countInStock=15,
        rating=4
    ), # 6
    ProductModel(
        name="realme 23.8 inch Full HD LED Backlit VA Panel with USB Type-C Port, Bezel-Less Panel, Anti-Glare, Flat Monitor (RMV2201)  (Response Time: 8 ms, 75 Hz Refresh Rate) ",
        image="https://rukminim2.flixcart.com/image/416/416/l5bd5zk0/monitor/v/j/4/rmv2201-full-hd-23-8-24f600rmv-realme-original-imaggyzyjf5h8bhw.jpeg?q=70",
        category="TV",
        description="Description 3",
        price=80,
        countInStock=15,
        rating=3
    ), # 7
    ProductModel(
        name="ZEBRONICS 32 inch Curved Full HD VA Panel Wall Mountable Monitor (ZEB -AC32FHD LED)  (Response Time: 8 ms, 75 Hz Refresh Rate)",
        image="https://rukminim2.flixcart.com/image/416/416/l3ahpjk0/monitor/a/v/q/-original-imagefsf8hkyuhdj.jpeg?q=70",
        category="Monitor",
        description="Description 3",
        price=30,
        countInStock=15,
        rating=3
    ), # 8
    ProductModel(
        name="POCO C51 (Power Black, 64 GB)  (4 GB RAM)",
        image="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/o/t/a/c51-mzb0e6din-poco-original-imagzdzzraqzsrzc.jpeg?q=70",
        category="Phone",
        description="Description 3",
        price=100,
        countInStock=15,
        rating=3
    ), # 9
    ProductModel(
        name="SAMSUNG Galaxy F13 (Nightsky Green, 64 GB)  (4 GB RAM) ",
        image="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/a/i/v/-original-imagfhu6bdzhnmkz.jpeg?q=70",
        category="TV",
        description="Description 3",
        price=140,
        countInStock=15,
        rating=3
    ), # 10
   
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
        comment="This product exceeded my expectations! It's absolutely fantastic and worth every penny. I highly recommend it.",
        rating=5,
        user_id=1,
        product_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    ),
    ReviewModel(
        name="User 2",
        comment="I'm extremely disappointed with the quality of this product. It's a complete waste of money. I wouldn't recommend it to anyone.",
        rating=1,
        user_id=2,
        product_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    ),
    ReviewModel(
        name="User 3",
        comment="I can't express how much I love this product! It's a game-changer and has improved my life in so many ways.",
        rating=5,
        user_id=1,
        product_id=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    ),
    ReviewModel(
        name="User 4",
        comment="I had high hopes for this product, but it turned out to be a disappointment. It's not worth the price, and the quality is subpar.",
        rating=2,
        user_id=2,
        product_id=2,
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