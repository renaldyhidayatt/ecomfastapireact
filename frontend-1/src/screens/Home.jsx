import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { getAllProducts } from '../redux/product.slice';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const getallproductstate = useSelector((state) => state.productReducer);
  const loginReducer = useSelector((state) => state.loginReducer);

  const { loading, products, error, accuracy } = getallproductstate;
  const {  currentUser } = loginReducer;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.jwtToken) {
      navigate("/")
      
    }
  }, [navigate]);

  return (
    <div className='mt-10'>
      <h1 className="text-center text-2xl font-bold mt-4">
        Recommendation Products based berdasarkan Rating dan Price
      </h1>
      <p className="text-center text-xl font-semibold">
        Accuracy: {accuracy}
      </p>

      <div className="flex flex-wrap justify-center mt-4 mx-2">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error error="Something went wrong..." />
        ) : (
          products.map((product) => (
            <div key={product.id} className="w-full md:w-1/4 m-2">
              <div className="shadow p-3 bg-white rounded">
                <Product product={product} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
