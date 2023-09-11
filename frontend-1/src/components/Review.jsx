import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Rating } from '@smastrom/react-rating';
import { addProductReview } from '../redux/product.slice';

export default function Review({ product }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const sendReview = () => {
    if (localStorage.getItem('currentUser')) {
      let alreadyReviewed = false;

      for (let i = 0; i < product.reviews.length; i++) {
        if (product.reviews[i].user_id === currentUser.id) {
          alreadyReviewed = true;
        }
      }

      if (alreadyReviewed) {
        alert('You have already reviewed this product');
      } else {
        const review = {
          rating: rating,
          comment: comment,
        };
        console.log(review);
        dispatch(addProductReview({ review: review, productid: product.id }));
      }
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="shadow p-3 mb-5 bg-white rounded mx-2">
      <h2>Give Your Review</h2>

      <Rating
        className="text-orange"
        style={{ maxWidth: 250 }}
        value={rating}
        initialRating={rating}
        onChange={setRating}
      />

      <input
        type="text"
        className="form-control mt-2"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />

      <button
        type="button"
        onClick={sendReview}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Submit Review
      </button>

      <h2 className="mt-3">Latest Reviews</h2>

      {product && product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review) => (
          <div className="text-left" key={review.id}>
            <Rating
              className="text-orange"
              style={{ maxWidth: 250 }}
              value={review.rating}
              readOnly={true}
            />
            <p>{review.comment}</p>
            <p>By: {review.name}</p>
            <p>Sentiment: {review.sentiment === 'POSITIVE' ? 'Positive' : 'Negative'}</p>
            <p>Sentiment Score: {review.sentiment_score}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
}
