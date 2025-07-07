import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/shared/Sidebar';
import Header from '../../components/shared/Header';
import { getFromStorage, saveToStorage } from '../../utils/localStorage';

const EditPatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        contact: '',
        healthInfo: ''
    });

    useEffect(() => {
        const patient = getFromStorage('patient') || [];
        const found = patient.find((p) => p.id === id);
        if (found) {
            setFormData(found);
        } else {
            alert('Patient not found');
            navigate('/patient');
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, dob, contact } = formData;
        if (!name || !dob || !contact) {
            alert('Please fill all required fields');
            return;
        }
        const patient = getFromStorage('patient') || [];
        const updated = patient.map((p) => (p.id === id ? formData : p));
        saveToStorage('patient', updated);
        navigate('/patient');
    };

    return (
        <div className="flex">
            <Sidebar role="Admin" />
            <div className="flex-1 ml-16 md:ml-64">
                <Header role="Admin" />

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Patient</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full p-3 border rounded"
                            required
                        />
                        <input
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                            required
                        />
                        <input
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="Contact Number"
                            className="w-full p-3 border rounded"
                            required
                        />
                        <textarea
                            name="healthInfo"
                            value={formData.healthInfo}
                            onChange={handleChange}
                            placeholder="Health Info (optional)"
                            className="w-full p-3 border rounded"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                const confirmDelete = window.confirm('Are you sure you want to delete this patient?');
                                if (confirmDelete) {
                                    const all = getFromStorage('patient') || [];
                                    const filtered = all.filter((p) => p.id !== id);
                                    saveToStorage('patient', filtered);
                                    navigate('/patient');
                                }
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded relative left-40"
                        >
                            Delete Patient
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPatient;
