import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductReview } from "../redux/action/product.action";
import Rating from "react-rating";

export default function Review({ product }) {
  const dispatch = useDispatch();
  const [rating, setrating] = useState(5);
  const [comment, setcomment] = useState("");

  const sendReview = () => {
    if (localStorage.getItem("currentUser")) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      var alreadyreviewed;

      for (var i = 0; i < product.reviews.length; i++) {
        if (product.reviews[i].user_id == currentUser.id) {
          alreadyreviewed = true;
        }
      }

      if (alreadyreviewed) {
        alert("You have already reviewd this product");
      } else {
        const review = {
          rating: rating,
          comment: comment,
        };
        console.log(product.id);
        dispatch(addProductReview(review, product.id));
      }
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="shadow p-3 mb-5 bg-white rounded ml-2 mr-3">
      <h2>Give Your Review</h2>

      <Rating
        style={{ color: "orange" }}
        initialRating={rating}
        emptySymbol="fa fa-star-o fa-1x"
        fullSymbol="fa fa-star fa-1x"
        onChange={(e) => {
          setrating(e);
        }}
      />

      <input
        type="text"
        className="form-control mt-2"
        value={comment}
        onChange={(e) => {
          setcomment(e.target.value);
        }}
      />
      <button className="btn mt-3" onClick={sendReview}>
        Submit Review
      </button>

      <h2 className="mt-3">Latest Reviews</h2>

      {product.reviews &&
        product.reviews.map((review) => {
          return (
            <div className="text-left">
              <Rating
                style={{ color: "orange" }}
                initialRating={review.rating}
                emptySymbol="far fa-star fa-1x"
                fullSymbol="fas fa-star fa-1x"
                readonly
              />
              <p>{review.comment}</p>
              <p>By : {review.name}</p>
              <hr />
            </div>
          );
        })}
    </div>
  );
}
