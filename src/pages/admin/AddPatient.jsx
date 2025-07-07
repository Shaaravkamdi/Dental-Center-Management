import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        contact: '',
        healthInfo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const patientId = `p-${Date.now()}`;
        const newPatient = {
            id: patientId,
            name: formData.name.trim(),
            dob: formData.dob,
            contact: formData.contact.trim(),
            healthInfo: formData.healthInfo.trim()
        };

        const existingPatients = JSON.parse(localStorage.getItem('patient')) || [];
        localStorage.setItem('patient', JSON.stringify([...existingPatients, newPatient]));

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const base = formData.name.toLowerCase().replace(/\s+/g, '');
        let email = base === 'johndoe' ? 'john@entnt.in' : `${base}@entnt.in`;
        let suffix = 1;

        while (users.find(u => u.email === email)) {
            email = `${base}${suffix}@entnt.in`;
            suffix++;
        }

        const newUser = {
            id: `u-${Date.now()}`,
            role: 'Patient',
            email,
            password: 'patient123',
            patientId
        };

        localStorage.setItem('users', JSON.stringify([...users, newUser]));

        navigate('/patient');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-baby-powder px-4">
            <div className="w-full max-w-xl bg-baby-powder p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center"> Add New Patient</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                        <input
                            type="text"
                            name="contact"
                            placeholder="Phone number or email"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Health Conditions</label>
                        <input
                            type="text"
                            name="healthInfo"
                            placeholder="E.g. Diabetes, Allergies"
                            value={formData.healthInfo}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Save Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatient;
