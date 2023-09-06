import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { getOrdersByUserId } from '../redux/order.slice';

export default function OrderScreen() {
  const orderState = useSelector((state) => state.orderReducer);

  const { orders, getOrdersByUserIdError, getOrdersByUserIdLoading } =
    orderState;

  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (currentUser) {
      dispatch(getOrdersByUserId(currentUser.id));
    } else {
      window.location.href = '/login';
    }
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-center mt-5">
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold">MY ORDERS</h2>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getOrdersByUserIdLoading && <Loader />}
              {orders &&
                orders.map((order) => {
                  return (
                    <tr
                      key={order.id}
                      onClick={() => {
                        window.location = `/orderinfo/${order._id}`;
                      }}
                    >
                      <td>{order.id}</td>
                      <td>{order.orderAmount}</td>
                      <td>{order.created_at.substring(0, 10)}</td>
                      <td>{order.transactionId}</td>
                      <td>
                        {order.isDelivered ? (
                          <li>Delivered</li>
                        ) : (
                          <li>Order Placed</li>
                        )}
                      </td>
                    </tr>
                  );
                })}
              {getOrdersByUserIdError && <Error error="something went wrong" />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
