import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/shared/Sidebar';
import Header from '../../components/shared/Header';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 6;

    useEffect(() => {
        const storedPatients = JSON.parse(localStorage.getItem('patient')) || [];

        setPatients(storedPatients);
    }, []);

    const indexOfLast = currentPage * patientsPerPage;
    const indexOfFirst = indexOfLast - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(patients.length / patientsPerPage);

    return (
        <div className="flex">
            <Sidebar role="Admin" />
            <div className="flex-1 ml-16 md:ml-64">
                <Header role="Admin" />

                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
                        <button
                            onClick={() => navigate('/patient/add')}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow"
                        >
                            + Add Patient
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentPatients.length > 0 ? (
                            currentPatients.map((patient) => (
                                <div
                                    key={patient.id}
                                    className="bg-azure p-4 rounded-lg shadow flex items-start space-x-4 relative"
                                >
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-700">
                                        {patient.name.charAt(0)}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                                        <p className="text-sm text-gray-600"><strong>DOB:</strong> {patient.dob}</p>
                                        <p className="text-sm text-gray-600"><strong>Contact:</strong> {patient.contact}</p>
                                        <p className="text-sm text-gray-600"><strong>Health:</strong> {patient.healthInfo || 'No conditions'}</p>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/patient/edit/${patient.id}`)}
                                        className="absolute top-3 right-3 text-gray-500"
                                        title="Edit"
                                    >
                                        <span className='hover:text-blue-600'>Edit</span>/<span className='hover:text-red-600'>Delete</span>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No patients found.</p>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded ${page === currentPage
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientList;
