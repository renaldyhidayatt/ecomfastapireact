import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { deleteUser, getAllUsers } from '../redux/user.slice';

export default function UsersList() {
  const getAllUsersState = useSelector((state) => state.getAllUsersReducer);
  const { users, loading, error } = getAllUsersState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Users List</h2>
      {loading && <Loader />}
      {error && <Error error="Something went wrong" />}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">User Id</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <i
                    className="far fa-trash-alt cursor-pointer"
                    onClick={() => {
                      dispatch(deleteUser(user.id));
                    }}
                  ></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
