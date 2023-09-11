import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import { Link } from 'react-router-dom';
import { registerNewUser } from '../redux/user.slice';

export default function RegisterScreen() {
  const registerstate = useSelector((state) => state.registerReducer);

  const { loading, error, success } = registerstate;

  const [name, setname] = useState('');
  const [email, setemail] = useState('');

  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
      is_staff: false,
      is_active: true
    };

    if (password === cpassword) {
      dispatch(registerNewUser(user));
    } else {
      alert('passwords not matched');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md mt-[-20px]">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-center text-2xl font-semibold mb-6">Register</h2>
          <i className="fa fa-user-plus text-3xl mb-6 mx-auto"></i>

          {loading && <Loader />}
          {error && <Error error="Email Address is already registered" />}
          {success && <Success success="Your Registration is successful" />}

          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={password}
              required
              onChange={(e) => setpassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={cpassword}
              required
              onChange={(e) => setcpassword(e.target.value)}
            />

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                REGISTER
              </button>
            </div>
          </form>

          <Link to="/login" className="block mt-4 text-center">
            Click Here To Login
          </Link>
        </div>
      </div>
    </div>
  );
}
