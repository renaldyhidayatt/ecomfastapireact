import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/action/user.action";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function LoginScreen() {
  const loginreducer = useSelector((state) => state.loginReducer);
  const { loading, error } = loginreducer;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();

    const coba_login = new FormData();

    coba_login.append("username", email);
    coba_login.append("password", password);

    dispatch(loginUser(coba_login));
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center m-3">
        <div
          className="col-md-4 card p-3 shadow p-3 mb-5 bg-white rounded"
          style={{ marginTop: "100px" }}
        >
          <div className="div">
            <h2 className="text-center m-3" style={{ display: "inline" }}>
              LOGIN
            </h2>
            <i
              style={{ fontSize: "25px" }}
              className="fa fa-sign-in"
              aria-hidden="true"
            ></i>

            {error && <Error error="Invalid Credentials" />}
            {loading && <Loader />}

            <form onSubmit={login}>
              <input
                type="text"
                placeholder="email"
                className="form-control"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="password"
                className="form-control"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <div className="text-right">
                <button type="submit" className="btn mt-3">
                  LOGIN
                </button>
              </div>
            </form>
          </div>

          <a style={{ color: "black" }} href="/register" className="mt-3">
            Click Here To Register
          </a>
        </div>
      </div>
    </div>
  );
}
