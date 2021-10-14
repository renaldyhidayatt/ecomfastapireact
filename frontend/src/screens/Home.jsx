import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../redux/action/product.action";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Filter from "../components/Filter";

export default function HomeScreen() {
  const getallproductstate = useSelector(
    (state) => state.getAllProductsReducer
  );

  const { loading, products, error } = getallproductstate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <Filter />
      <div className="row justify-content-center mt-5 ml-2 mr-2">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error error="Something went wrong..." />
        ) : (
          products.map((product) => {
            return (
              <div className="col-md-3 m-2 p-2 shadow p-3 mb-5 bg-white rounded card">
                <Product key={product.id} product={product} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
