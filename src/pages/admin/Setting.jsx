import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/shared/Sidebar';
import Header from '../../components/shared/Header';

const Setting = () => {
    const [profile, setProfile] = useState({ fullName: '', email: '', password: '' });
    const [notifications, setNotifications] = useState({
        appointmentReminders: true,
        weeklySummary: false,
        labResults: false,
        treatmentUpdates: false,
    });

    useEffect(() => {
        const savedProfile = JSON.parse(localStorage.getItem('SettingProfile'));
        const savedNotifications = JSON.parse(localStorage.getItem('SettingNotifications'));
        if (savedProfile) setProfile(savedProfile);
        if (savedNotifications) setNotifications(savedNotifications);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggle = (key) => {
        setNotifications((prev) => {
            const updated = { ...prev, [key]: !prev[key] };
            localStorage.setItem('SettingNotifications', JSON.stringify(updated));
            return updated;
        });
    };

    const handleSave = () => {
        localStorage.setItem('SettingProfile', JSON.stringify(profile));
        alert('Settings updated.');
    };

    return (
        <div className="flex">
            <Sidebar role="admin" />
            <div className="flex-1 ml-16 md:ml-64 p-6">
                <Header role="admin" />
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Settings</h1>

                <div className="bg-baby-powder p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile</h2>

                    <div className="flex flex-col gap-4 max-w-md">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={profile.fullName}
                                onChange={handleChange}
                                placeholder="Admin Name"
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
                                placeholder="admin@example.com"
                                className="w-full border rounded p-3"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-baby-powder p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Password</h2>

                    <div className="flex flex-col gap-4 max-w-md">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Change Password</label>
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
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-2 w-fit"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="bg-baby-powder p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h2>

                    <div className="space-y-3">
                        {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <span className="capitalize text-sm text-gray-800">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => handleToggle(key)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
