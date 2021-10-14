import StripeCheckout from "react-stripe-checkout";
import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/action/order.action";

export default function Checkout({ amount }) {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.placeOrderReducer);

  const { loading, success, error } = orderState;

  function tokenHandler(token) {
    dispatch(placeOrder(token, amount));
  }

  const validate = () => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {success && <Success success="Your Order Placed Successfully" />}
      {error && <Error error="Something Went wrong" />}
      <StripeCheckout
        token={tokenHandler}
        amount={amount * 1000}
        shippingAddress
        currency="IDR"
        stripeKey="pk_test_51GMl3sHuRdGEFSeWbPR8J28xMmF9ORoSNZOlGjSipRL0RjRE4L24sdkbB4F3RpLqMAeCY73gM0FaACjld3sPfhxY00SfrT5z8h"
      >
        <button className="btn" onClick={validate}>
          PAY NOW
        </button>
      </StripeCheckout>
    </div>
  );
}
