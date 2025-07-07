import React from 'react';

const Header = ({ role = 'Admin' }) => {
    const handleLogout = () => {

        localStorage.removeItem('userId');
        window.location.href = '/';
    };

    return (
        <header className="w-full flex justify-end items-center px-6 py-4 bg-baby-powder z-10">
            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    Logged in as <strong>{role}</strong>
                </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-cyan-100 hover:bg-cyan-200 text-gray-800 px-4 py-2 rounded-xl font-semibold transition transform hover:scale-105"
                >
                    <i className="fa-solid fa-user"></i>
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
