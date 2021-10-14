import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/action/product.action";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { addToCart } from "../redux/action/cart.action";
import Review from "../components/Review";

export default function ProductDetail({ match }) {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const getproductstate = useSelector((state) => state.getProductByIdReducer);
  const { product, loading, error } = getproductstate;
  const [quantity, setQuantity] = useState(1);

  const addCart = () => {
    dispatch(addToCart(product, quantity));
  };

  useEffect(() => {
    dispatch(getProductById(productId));
    console.log(product.id);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div className="card p-2 m-2">
              <h1>{product.name}</h1>
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid m-3 bigimg"
              />
              <p>{product.description}</p>
            </div>
          </div>
          <div className="col-md-6 text-left">
            <div className="m-2">
              <h1>Price: {product.price}</h1>
              <hr />
              <h1>Selected Quantity</h1>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[...Array(product.countInStock).keys()].map((x, i) => {
                  return <option value={i + 1}>{i + 1}</option>;
                })}
              </select>
              <hr />
              {product.countInStock > 0 ? (
                <button className="btn btn-dark" onClick={addCart}>
                  Add to cart
                </button>
              ) : (
                <div>
                  <h1>Out Of StocK</h1>
                  <button className="btn" disabled>
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
            <hr />
            <Review product={product} />
          </div>
        </div>
      )}
    </div>
  );
}
