import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import HomeScreen from './screens/Home';
import ProductDetail from './screens/ProductDetail';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import CartScreen from './screens/Cart';
import OrderScreen from './screens/Order';
import OrderInfo from './screens/OrderInfo';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/Admin';
import NoMatch from './screens/NoMatch';
import UsersList from './screens/UserList';
import AddProduct from './screens/AddProduct';
import EditProduct from './screens/EditProduct';
import Orderslist from './screens/Orderlist';
import ProductList from './screens/ProductList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/orders" element={<OrderScreen />} />
          <Route path="/orderinfo/:orderid" element={<OrderInfo />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin" element={<AdminScreen />}>
            <Route index element={<UsersList />} />
            <Route path="productslist" element={<ProductList />} />
            <Route path="userslist" element={<UsersList />} />
            <Route path="addnewproduct" element={<AddProduct />} />
            <Route path="editproduct/:id" element={<EditProduct />} />
            <Route path="orderslist" element={<Orderslist />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
