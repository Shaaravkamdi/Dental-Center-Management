import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoginImg from '../../assets/dentist-examining-patient-teeth.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const role = login(email, password);

    if (role === 'Admin') {
      navigate('/dashboard');
    } else if (role === 'Patient') {
      navigate('/patient/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">

      <div className="w-full md:w-1/2 p-8 md:p-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* FOTGOT PASSWORD */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>

          {/* LOGIN */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Log in
          </button>

          {/* CREATE NEW */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?
            <a href="/register" className="text-blue-500 hover:underline ml-1">Sign up</a>
          </p>
        </form>
      </div>

      {/* IMAGE */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-8">
        <img src={LoginImg} alt="Dentist examining patient" className="max-w-md w-full mb-6" />
        <h1 className="text-3xl font-bold text-gray-700">Dental Center</h1>
      </div>
    </div>
  );
};

export default Login;
