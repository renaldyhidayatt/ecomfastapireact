import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Error from '../components/Error';
import Loader from '../components/Loader';
import Filter from '../components/Filter';
import { getAllProducts } from '../redux/product.slice';

export default function HomeScreen() {
  const getallproductstate = useSelector((state) => state.productReducer);

  const { loading, products, error } = getallproductstate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <Filter />
      <div className="flex flex-wrap justify-center mt-8 mx-2">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error error="Something went wrong..." />
        ) : (
          products.map((product) => (
            <div className="w-full md:w-1/4 m-2">
              <div className="shadow p-3 bg-white rounded">
                <Product key={product.id} product={product} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
