import { useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import UsersList from "./UserList";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import Editproduct from "./EditProduct";
import Orderslist from "./Orderlist";

export default function AdminScreen() {
  const userState = useSelector((state) => state.loginReducer);
  const currentUser = userState.currentUser;

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.is_staff) {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center mt-2">
        <div className="col-md-10">
          <h2>Admin Panel</h2>
          <ul className="admin p-2">
            <li>
              <Link to="/admin/userslist" style={{ color: "black" }}>
                UsersList
              </Link>
            </li>
            <li>
              <Link to="/admin/productslist" style={{ color: "black" }}>
                Products List
              </Link>
            </li>
            <li>
              <Link to="/admin/addnewproduct" style={{ color: "black" }}>
                Add New Product
              </Link>
            </li>
            <li>
              <Link to="/admin/orderslist" style={{ color: "black" }}>
                Orderslist
              </Link>
            </li>
          </ul>

          {/* Switch */}
          <Switch>
            <Route path="/admin/" component={UsersList} exact />
            <Route path="/admin/userslist" component={UsersList} />
            <Route path="/admin/productslist" component={ProductList} />
            <Route path="/admin/addnewproduct" component={AddProduct} />
            <Route
              path="/admin/editproduct/:productid"
              component={Editproduct}
            />
            <Route path="/admin/orderslist" component={Orderslist} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
