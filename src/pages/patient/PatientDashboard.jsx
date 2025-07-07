import React, { useEffect, useState } from 'react';
import PatientSidebar from '../../components/shared/PatientSidebar';

const PatientDashboard = () => {
    const [upcomingAppointment, setUpcomingAppointment] = useState(null);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [billing, setBilling] = useState(0);

    useEffect(() => {
        const fetchPatientData = () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const users = JSON.parse(localStorage.getItem('users')) || [];

            if (!currentUser || currentUser.role !== 'Patient') return;

            const userEntry = users.find(u => u.email === currentUser.email);
            if (!userEntry) return;

            const patientId = userEntry.patientId;

            const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
            const allTreatments = JSON.parse(localStorage.getItem('incidents')) || [];

            const now = new Date();

            const patientAppointments = allAppointments.filter(a => a.patientId === patientId);

            const upcoming = patientAppointments
                .filter(a => new Date(a.date) >= now)
                .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
            setUpcomingAppointment(upcoming);

            const past = patientAppointments.filter(a => new Date(a.date) < now);
            setPastAppointments(past);

            const relatedTreatments = allTreatments.filter(t => t.patientId === patientId);
            setTreatments(relatedTreatments);

            const total = relatedTreatments.reduce((sum, t) => sum + (parseFloat(t.cost) || 0), 0);
            setBilling(total);
        };

        fetchPatientData();

        window.addEventListener('appointmentsUpdated', fetchPatientData);
        window.addEventListener('storage', fetchPatientData);

        return () => {
            window.removeEventListener('appointmentsUpdated', fetchPatientData);
            window.removeEventListener('storage', fetchPatientData);
        };
    }, []);

    return (
        <div className="flex">
            <PatientSidebar role="Patient" />
            <div className="flex-1 ml-16 md:ml-64">
                <div className="p-6 pt-22">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>

                    <div className="bg-orange-100 p-4 rounded-lg mb-6">
                        <h2 className="text-lg font-semibold mb-2">Upcoming Appointment</h2>
                        {upcomingAppointment ? (
                            <p className="text-sm text-gray-700">
                                {upcomingAppointment.date} at {upcomingAppointment.time} with {upcomingAppointment.dentist}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500">No upcoming appointments.</p>
                        )}
                    </div>

                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Treatments</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-100 p-4 rounded">
                            <h3 className="text-lg font-medium">Treatments</h3>
                            <p className="text-sm text-gray-600">{treatments.length} total treatment(s) completed</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded">
                            <h3 className="text-lg font-medium">Billing & Payments</h3>
                            <p className="text-sm text-gray-600">${billing.toFixed(2)} Due</p>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Past Appointments</h2>
                    <div className="bg-cyan-100 p-6 rounded-lg shadow">
                        {pastAppointments.length > 0 ? (
                            <div className="space-y-4">
                                {pastAppointments.map((appt, i) => (
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
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
