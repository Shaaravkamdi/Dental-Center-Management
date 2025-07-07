import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/shared/Sidebar';
import Header from '../../components/shared/Header';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState({ date: '', status: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(stored);
    }, []);

    const renderStatusBadge = (status) => {
        const base = 'px-3 py-1 text-xs rounded-full font-medium';
        switch (status.toLowerCase()) {
            case 'completed':
                return <span className={`${base} bg-green-100 text-green-700`}>{status}</span>;
            case 'scheduled':
                return <span className={`${base} bg-blue-100 text-blue-700`}>{status}</span>;
            case 'canceled':
                return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
            default:
                return <span className={`${base} bg-gray-100 text-gray-600`}>{status}</span>;
        }
    };

    const handleDelete = (id) => {
        const updated = appointments.filter((appt) => appt.id !== id);
        setAppointments(updated);
        localStorage.setItem('appointments', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    const filteredAppointments = appointments.filter((appt) => {
        const matchDate = filter.date ? appt.date === filter.date : true;
        const matchStatus = filter.status ? appt.status === filter.status : true;
        return matchDate && matchStatus;
    });

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar role="Admin" />
            <div className="flex-1 md:ml-64">
                <Header role="Admin" />

                <div className="p-6">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
                        <button
                            onClick={() => navigate('/appointment/add')}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-sm"
                        >
                            + Add Appointment
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <input
                            type="date"
                            value={filter.date}
                            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                            className="p-2 border rounded w-full sm:w-60"
                        />
                        <select
                            value={filter.status}
                            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                            className="p-2 border rounded w-full sm:w-60"
                        >
                            <option value="">All Statuses</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>

                    <div className=" bg-baby-powder rounded-lg shadow overflow-x-auto">
                        <table className="min-w-[600px] w-full text-sm">
                            <thead className="text-xs text-gray-600 ">
                                <tr>
                                    <th className="p-3 text-left">Patient</th>
                                    <th className="p-3 text-left">Date</th>
                                    <th className="p-3 text-left">Time</th>
                                    <th className="p-3 text-left">Dentist</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map((appt) => (
                                        <tr
                                            key={appt.id}
                                            className="border-t hover:bg-gray-50 transition duration-200"
                                        >
                                            <td className="p-3 font-medium text-gray-800">{appt.patient}</td>
                                            <td className="p-3">{appt.date}</td>
                                            <td className="p-3">{appt.time}</td>
                                            <td className="p-3">{appt.dentist}</td>
                                            <td className="p-3">{renderStatusBadge(appt.status)}</td>

                                            <td className="p-3 space-x-2">
                                                <button
                                                    onClick={() => navigate(`/appointment/edit/${appt.id}`)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(appt.id)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>

                                                {appt.status.toLowerCase() === 'completed' && (
                                                    <button
                                                        onClick={() => navigate(`/invoice/view/${appt.id}`)}
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        View Invoice
                                                    </button>
                                                )}
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-4 text-center text-gray-500 text-sm"
                                        >
                                            No appointments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
