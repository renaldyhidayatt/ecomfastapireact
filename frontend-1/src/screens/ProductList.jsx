import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllProducts } from '../redux/product.slice';

export default function ProductList() {
  const dispatch = useDispatch();
  const getallproductsstate = useSelector((state) => state.productReducer);
  const { products, loading, error } = getallproductsstate;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Products List</h2>
      {loading && <Loader />}
      {error && <Error error="Something went wrong" />}

      <table className="table-auto w-full">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Price
            </th>
            <th scope="col" className="px-6 py-4">
              Stock
            </th>
            <th scope="col" className="px-6 py-4">
              Id
            </th>
            <th scope="col" className="px-6 py-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products &&
            products.map((product) => {
              return (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.countInStock}</td>
                  <td className="px-6 py-4">{product.id}</td>
                  <td className="px-6 py-4">
                    <i
                      className="far fa-trash-alt cursor-pointer mr-2"
                      onClick={() => {
                        dispatch(deleteProduct(product.id));
                      }}
                    ></i>
                    <Link to={`/admin/editproduct/${product.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
