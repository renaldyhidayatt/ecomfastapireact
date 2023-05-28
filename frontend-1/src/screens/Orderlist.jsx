import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { getAllOrders } from '../redux/order.slice';

export default function Orderslist() {
  const getordersstate = useSelector((state) => state.orderReducer);
  const { getAllOrdersLoading, getAllOrdersError, orders } = getordersstate;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div className="flex justify-center mt-3">
      {getAllOrdersLoading && <Loader />}
      {getAllOrdersError && <Error error="something went wrong" />}
      <div className="mx-auto">
        <h2 className="text-center text-2xl font-semibold">Orders List</h2>
        <table className="table border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Order Id</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">User Id</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Transaction Id</th>
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
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.email}</td>
                    <td className="px-4 py-2">{order.user_id}</td>
                    <td className="px-4 py-2">{order.orderAmount}</td>
                    <td className="px-4 py-2">{order.created_at}</td>
                    <td className="px-4 py-2">{order.transactionId}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
