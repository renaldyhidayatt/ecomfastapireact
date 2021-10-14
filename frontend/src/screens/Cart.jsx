import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/action/cart.action";
import Checkout from "../components/Checkout";

export default function CartScreen() {
  const cartreducerstate = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const { cartItems } = cartreducerstate;

  var subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <div className="row mt-3 justify-content-center">
        <div className="col-md-8 card text-center shadow p-3 mb-5 bg-white rounded">
          <div className="text-center m-5">My Cart</div>
          <table className="table table-bordered table-responsives-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <select
                        value={item.quantity}
                        onChange={(e) => {
                          dispatch(addToCart(item, e.target.value));
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x, i) => {
                          return <option value={i + 1}>{i + 1}</option>;
                        })}
                      </select>
                    </td>

                    <td>{item.quantity * item.price}</td>
                    <td>
                      <i
                        style={{ color: "red" }}
                        class="far fa-trash-alt"
                        onClick={() => {
                          dispatch(deleteFromCart(item));
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr />
          <h2 className="text-center">SubTotal : {subtotal} Rp/-</h2>
          <hr />
          <Checkout amount={subtotal} />
        </div>
      </div>
    </div>
  );
}
