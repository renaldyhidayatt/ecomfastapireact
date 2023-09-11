import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/user.slice';
import Error from '../components/Error';
import Loader from '../components/Loader';

export default function LoginScreen() {
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const { loading, error, currentUser } = loginReducer;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    dispatch(loginUser(formData));

    navigate('/')
  };

  useEffect(() => {
    if (currentUser && currentUser.jwtToken) {
      navigate('/');
      
    }
  }, [navigate]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md mt-[-40px]">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-center text-2xl font-semibold mb-6">LOGIN</h2>
          <i className="fa fa-sign-in text-3xl mb-6 mx-auto"></i>

          {error && <Error error="Invalid Credentials" />}
          {loading && <Loader />}

          <form onSubmit={login}>
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                LOGIN
              </button>
            </div>
          </form>

          <a href="/register" className="block mt-4 text-center">
            Click Here To Register
          </a>
        </div>
      </div>
    </div>
  );
}
