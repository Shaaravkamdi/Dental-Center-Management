import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- Link added

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, role, password } = formData;
    if (!fullName || !email || !role || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const newUser = {
      id: Date.now().toString(),
      ...formData
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <i className="fa-solid fa-user-tie absolute top-1/2 left-3 -translate-y-1/2" style={{ color: "#ea781a" }}></i>
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded focus:outline-none"
            />
          </div>

          <div className="relative">
            <i className="fa-solid fa-envelope absolute top-1/2 left-3 -translate-y-1/2" style={{ color: "#74C0FC" }}></i>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded focus:outline-none"
            />
          </div>

          <div className='relative'>
            <i className="fa-solid fa-key absolute top-1/2 left-3 -translate-y-1/2" style={{ color: "#FFD43B" }}></i>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin (Dentist)</option>
              <option value="Patient">Patient</option>
            </select>
          </div>

          <div className='relative'>
            <i className="fa-solid fa-unlock absolute top-1/2 left-3 -translate-y-1/2" style={{ color: "#B197FC" }}></i>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
