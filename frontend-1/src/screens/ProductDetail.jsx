import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../redux/cart.slice';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Review from '../components/Review';
import { getProductById } from '../redux/product.slice';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cartError, setCartError] = useState('');
  const productState = useSelector((state) => state.productReducer);
  const { product, loading, error } = productState;
  const [quantity, setQuantity] = useState(1);

  const addCart = () => {
    const parsedQuantity = parseInt(quantity);
    if (
      isNaN(parsedQuantity) ||
      parsedQuantity <= 0 ||
      parsedQuantity > product?.countInStock
    ) {
      setCartError('Invalid quantity');
      return;
    }
    console.log(product, parsedQuantity);
    dispatch(addItemToCart({ product, quantity: parsedQuantity }));
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="flex flex-row">
      {product && (
        <>
          <div className="w-full md:w-6/12 mt-8">
            <div className="bg-white shadow p-2 m-2 rounded">
              <h1>{product.name}</h1>
              <div className="flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid m-3 max-w-full"
                />
              </div>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="w-full md:w-6/12">
            <div className="m-2">
              <h1>Price: {product.price}</h1>
              <hr />
              <h1>Selected Quantity</h1>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 p-2 rounded-md"
                min={1}
                max={product.countInStock}
              />

              <hr />
              {product.countInStock > 0 ? (
                <button
                  className="bg-gray-800 text-white py-2 px-4 rounded-md"
                  onClick={addCart}
                >
                  Add to Cart
                </button>
              ) : (
                <div>
                  <h1>Out Of Stock</h1>
                  <button
                    className="bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                    disabled
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
            <hr />
            <Review product={product} />
          </div>
        </>
      )}
      {cartError && <Error error={cartError} />}
    </div>
  );
}
