import React, { useEffect, useState } from 'react';
import PatientSidebar from '../../components/shared/PatientSidebar';

const PatientTreatment = () => {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!currentUser || currentUser.role !== 'Patient') return;

    const user = users.find(u => u.email === currentUser.email && u.role === 'Patient');
    if (!user) return;

    const patientId = user.patientId;

    const allTreatments = JSON.parse(localStorage.getItem('incidents')) || [];
    const myTreatments = allTreatments.filter(t => t.patientId === patientId);

    setTreatments(myTreatments);
  }, []);

  return (
    <div className="flex">
      <PatientSidebar role="Patient" />
      <div className="flex-1 ml-16 md:ml-64 p-6 pt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Treatments</h1>

        {treatments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {treatments.map((t, i) => (
              <div
                key={i}
                className="bg-blue-100 p-4 rounded shadow-md text-gray-700"
              >
                <h3 className="text-lg font-semibold">{t.name || 'Dental Procedure'}</h3>
                <p className="text-sm">Date: {t.date}</p>
                <p className="text-sm">Status: {t.status || 'Completed'}</p>
                {t.cost && <p className="text-sm">Cost: ${t.cost}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No treatment records found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientTreatment;
