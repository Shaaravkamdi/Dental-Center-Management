import React, { useState, useEffect } from 'react';
import PatientSidebar from '../../components/shared/PatientSidebar';

const PatientSetting = () => {
  const [profile, setProfile] = useState({ fullName: '', email: '', password: '' });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('SettingProfile'));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('SettingProfile', JSON.stringify(profile));
    alert('Profile updated.');
  };

  return (
    <div className="flex">
      <PatientSidebar role="patient" />
      <div className="flex-1 ml-16 md:ml-64 p-6 pt-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Patient Settings</h1>

        <div className="bg-baby-powder p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Profile</h2>

          <div className="flex flex-col gap-4 max-w-md">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full border rounded p-3"
              />
            </div>
          </div>
        </div>

        <div className="bg-baby-powder p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Password</h2>

          <div className="flex flex-col gap-4 max-w-md">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Current Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border rounded p-3"
              />
            </div>

            <button
              onClick={handleSave}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded mt-2 w-fit"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSetting;
