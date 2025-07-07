import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAppointment = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);

    const [formData, setFormData] = useState({
        patientId: '',
        date: '',
        time: '',
        dentist: '',
        status: 'Scheduled'
    });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('patient')) || [];
        setPatients(stored);
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { patientId, date, time, dentist, status } = formData;
        const patient = patients.find(p => p.id === patientId);

        if (!patient) {
            alert('Select a valid patient');
            return;
        }

        const newAppointment = {
            id: `appt-${Date.now()}`,
            patientId: patient.id,
            patient: patient.name,
            date,
            time,
            dentist,
            status
        };

        const existing = JSON.parse(localStorage.getItem('appointments')) || [];
        localStorage.setItem('appointments', JSON.stringify([...existing, newAppointment]));

        window.dispatchEvent(new Event('appointmentsUpdated'));
        navigate('/appointment');
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6 bg-baby-powder md:ml-64">
            <div className="w-full max-w-xl bg-baby-powder p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8"> Add Appointment</h1>

                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient</label>
                        <select
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">-- Choose Patient --</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dentist Name</label>
                        <input
                            type="text"
                            name="dentist"
                            placeholder="Dr. Smith"
                            value={formData.dentist}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Save Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAppointment;
