import React, { useEffect, useState } from 'react';
import PatientSidebar from '../../components/shared/PatientSidebar';

const PatientAppointment = () => {
    const [upcoming, setUpcoming] = useState(null);
    const [past, setPast] = useState([]);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (!currentUser || currentUser.role !== 'Patient') return;


        const userEntry = users.find(u => u.email === currentUser.email);
        if (!userEntry) return;

        const patientId = userEntry.patientId;

        const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

        const patientAppointments = allAppointments.filter(a => a.patientId === patientId);

        const now = new Date();

        const upcomingAppt = patientAppointments
            .filter(a => new Date(a.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

        const pastAppts = patientAppointments.filter(a => new Date(a.date) < now);

        setUpcoming(upcomingAppt);
        setPast(pastAppts);
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <PatientSidebar role="Patient" />
            <main className="flex-1 p-4 sm:p-6 md:ml-64 relative top-15">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Appointments</h1>

                <div className="bg-orange-100 p-6 rounded-lg shadow mb-8 flex flex-col md:flex-row items-center gap-6">
                    <i className="fa-regular fa-calendar-check text-[5rem] text-orange-500" />
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-semibold mb-2">Upcoming Appointment</h2>
                        {upcoming ? (
                            <p className="text-sm text-gray-700">
                                {upcoming.date} at {upcoming.time} with Dr. {upcoming.dentist}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500">You have no upcoming appointments.</p>
                        )}
                    </div>
                </div>

                <div className="bg-cyan-100 p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-4">Past Appointments</h2>
                    {past.length > 0 ? (
                        <div className="space-y-4">
                            {past.map((appt, i) => (
                                <div
                                    key={i}
                                    className="bg-blue-100 p-4 rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-2"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {appt.treatment || 'Dental Visit'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {appt.date} with Dr. {appt.dentist}
                                        </p>
                                    </div>
                                    {appt.amount && (
                                        <p className="text-sm font-semibold text-blue-800">
                                            ${appt.amount}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No past appointments available.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PatientAppointment;

