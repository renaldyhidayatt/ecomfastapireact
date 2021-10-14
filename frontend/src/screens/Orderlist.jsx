import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getAllorders } from "../redux/action/order.action";

export default function Orderslist() {
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);

  const { loading, error, orders } = getordersstate;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllorders());
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && <Error error="something went wrong" />}
      <h2>Orders List</h2>
      <table className="table table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Transaction Id</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr
                  key={order.id}
                  onClick={() => {
                    window.location.href = `/orderinfo/${order.id}`;
                  }}
                >
                  <td>{order.id}</td>
                  <td>{order.email}</td>
                  <td>{order.user_id}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.created_at}</td>
                  <td>{order.transactionId}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
