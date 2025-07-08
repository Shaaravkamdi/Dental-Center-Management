// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import tooth from '../../assets/tooth.png';

// const PatientSidebar = () => {

//     return (
//         <div className="flex">

//             <aside className="h-screen p-4 fixed w-16 md:w-64 ">
//                 <div className="flex items-center space-x-3">
//                     <div className="bg-orange-100 p-2 rounded-full">
//                         <img src={tooth} alt="Tooth Icon" className="w-7 h-7" />
//                     </div>
//                     <h1 className="text-2xl font-semibold text-charcol">Dental Center</h1>
//                 </div>
//                 <ul className=' flex flex-col mt-10 text-base md:text-lg'>
//                     <li className=' flex items-center py-3 px-2 space-x-4 hover:rounded-2xl hover:cursor-pointer hover:bg-blue-100 hover:text-charcol'>
//                         <a href="/patient/dashboard"> <i className="fa-solid fa-table" style={{ color: '#f27b2c' }}></i> </a>
//                         <a href="/patient/dashboard"><span className=' hidden md:inline'>Dashboard</span></a>
//                     </li>
//                     <li className=' flex items-center py-3 px-2 space-x-4 hover:rounded-2xl hover:cursor-pointer hover:bg-blue-100 hover:text-charcol'>
//                         <a href="/patient/appointments"> <i className="fa-solid fa-calendar-check" style={{ color: '#8e8ef2' }}></i></a>
//                         <a href="/patient/appointments">  <span className=' hidden md:inline'>Appointments</span></a>
//                     </li>
//                     <li className=' flex items-center py-3 px-2 space-x-4 hover:rounded-2xl hover:cursor-pointer hover:bg-blue-100 hover:text-charcol'>
//                         <a href="/patient/treatments"><i className="fa-solid fa-tooth" style={{ color: '#5ac8fa' }}></i></a>
//                         <a href="/patient/treatments"><span className=' hidden md:inline'>Treatment</span></a>
//                     </li>
//                     <li className=' flex items-center py-3 px-2 space-x-4 hover:rounded-2xl hover:cursor-pointer hover:bg-blue-100 hover:text-charcol'>
//                         <a href="/patient/file">   <i className="fa-solid fa-folder" style={{ color: "#d9a287" }}></i></a>
//                         <a href="/patient/file">   <span className=' hidden md:inline'>Files</span></a>
//                     </li>
//                     <li className=' flex items-center py-3 px-2 space-x-4 hover:rounded-2xl hover:cursor-pointer hover:bg-blue-100 hover:text-charcol'>
//                         <a href="/patient/setting"> <i className="fa-solid fa-gear" style={{ color: '#9d9dfd' }}></i></a>
//                         <a href="/patient/setting"> <span className=' hidden md:inline'>Setting</span></a>
//                     </li>
//                 </ul>


//                 <ul className=' flex flex-col mt-65 text-base md:text-lg'>

//                     <li
//                         onClick={() => {
//                             window.location.href = '/';
//                         }}
//                         className="flex items-center py-3 px-2 space-x-4 hover:rounded-2xl hover:cursor-pointer hover:bg-blue-100 hover:text-charcol"
//                     >
//                         <i className="fa-solid fa-right-from-bracket" style={{ color: '#f21c1c' }}></i>
//                         <span className="hidden md:inline">Logout</span>
//                     </li>
//                 </ul>


//             </aside>
//         </div>
//     );
// };

// export default PatientSidebar;




import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tooth from '../../assets/tooth.png';

const PatientSidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { to: '/patient/dashboard', icon: 'fa-table', label: 'Dashboard', color: '#f27b2c' },
        { to: '/patient/appointments', icon: 'fa-calendar-check', label: 'Appointments', color: '#8e8ef2' },
        { to: '/patient/treatments', icon: 'fa-tooth', label: 'Treatment', color: '#5ac8fa' },
        { to: '/patient/file', icon: 'fa-folder', label: 'Files', color: '#d9a287' },
        { to: '/patient/setting', icon: 'fa-gear', label: 'Setting', color: '#9d9dfd' },
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
                    <h1 className="text-2xl font-semibold text-charcol hidden md:inline">Dental Center</h1>
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

                <ul className="flex flex-col mt-12 text-base md:text-lg">
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

export default PatientSidebar;
