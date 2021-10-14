import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../redux/action/product.action";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link } from "react-router-dom";

export default function ProductList() {
  const dispatch = useDispatch();
  const getallproductsstate = useSelector(
    (state) => state.getAllProductsReducer
  );
  const { products, loading, error } = getallproductsstate;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Products list</h2>
      {loading && <Loader />}
      {error && <Error error="something went wrong" />}

      <table className="table table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Id</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products &&
            products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.id}</td>
                  <td>
                    <i
                      className="far fa-trash-alt"
                      style={{ marginRight: "10px" }}
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
