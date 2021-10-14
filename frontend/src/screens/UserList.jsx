import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../redux/action/user.action";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function UsersList() {
  const getallusersstate = useSelector((state) => state.getAllUsersReducer);
  const { users, loading, error } = getallusersstate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users List</h2>
      {loading && <Loader />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <i
                      class="far fa-trash-alt"
                      onClick={() => {
                        dispatch(deleteUser(user.id));
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
