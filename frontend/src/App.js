import "./App.css";
import Navbar from "./components/Navbar";
import HomeScreen from "./screens/Home";
import { Switch, Route } from "react-router-dom";
import ProductDetail from "./screens/ProductDetail";
import CartScreen from "./screens/Cart";
import RegisterScreen from "./screens/Register";
import LoginScreen from "./screens/Login";
import OrderScreen from "./screens/Order";
import OrderInfo from "./screens/OrderInfo";
import AdminScreen from "./screens/Admin";
import Profilescreen from "./screens/ProfileScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/cart" component={CartScreen} />
        <Route path="/product/:id" exact component={ProductDetail} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/orders" component={OrderScreen} />
        <Route path="/orderinfo/:orderid" component={OrderInfo} />
        <Route path="/profile" component={Profilescreen} />
        <Route path="/admin" component={AdminScreen} />
      </Switch>
    </div>
  );
}

export default App;
