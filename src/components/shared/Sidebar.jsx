import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tooth from '../../assets/tooth.png';

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { to: '/dashboard', icon: 'fa-table', label: 'Dashboard', color: '#c08d62' },
        { to: '/patient', icon: 'fa-hospital-user', label: 'Patients', color: '#5182d6' },
        { to: '/appointment', icon: 'fa-calendar-check', label: 'Appointments', color: '#FFD43B' },
        { to: '/file', icon: 'fa-folder', label: 'Files', color: '#d9a287' },
        { to: '/setting', icon: 'fa-gear', label: 'Settings', color: '#63E6BE' },
    ];

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="flex">
            <aside className="h-screen p-4 fixed w-16 md:w-64 bg-baby-powder z-20">

                <div className="flex items-center space-x-3 px-2">
                    <div className="bg-orange-100 p-2 rounded-full">
                        <img src={tooth} alt="Tooth Icon" className="w-7 h-7" />
                    </div>
                    <h1 className="text-xl font-semibold text-charcol hidden md:inline">Dental Center</h1>
                </div>

                <ul className="flex flex-col mt-10 text-base md:text-lg">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center py-3 px-2 space-x-4 hover:rounded-2xl hover:cursor-pointer hover:bg-blue-100 hover:text-charcol"
                        >
                            <Link to={item.to} className="flex items-center space-x-4 w-full">
                                <i className={`fa-solid ${item.icon}`} style={{ color: item.color }}></i>
                                <span className="hidden md:inline">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="my-6 mx-2" />

                <ul className="flex flex-col text-base md:text-lg relative top-55">
                    <li className="flex items-center py-3 px-2 space-x-4 text-gray-700">
                        <i className="fa-solid fa-user-tie" style={{ color: '#c665c8' }}></i>
                        <span className="hidden md:inline">Admin</span>
                    </li>

                    <li
                        onClick={handleLogout}
                        className="flex items-center py-3 px-2 space-x-4 hover:rounded-2xl hover:cursor-pointer hover:bg-blue-100 hover:text-charcol text-red-600"
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className="hidden md:inline">Logout</span>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
