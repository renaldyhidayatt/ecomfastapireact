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
    <div className="max-w-screen-xl mx-auto mt-10">
      {product && (
        <>
          <div className="">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto"
                />
              </div>
              <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                <h1 className="text-xl xl:text-2xl font-medium mb-1">
                  {product.title}
                </h1>

                <p>{product.description}</p>
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
                    <button
                      className="bg-gray-800 text-white py-2 px-4 rounded-md mt-6"
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
            </div>
          </div>
        </>
      )}
      {cartError && <Error error={cartError} />}
    </div>
  );
}
