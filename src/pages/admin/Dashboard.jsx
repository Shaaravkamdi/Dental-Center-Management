import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/shared/Sidebar';
import Header from '../../components/shared/Header';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [files, setFiles] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const loadData = () => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const storedIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    setAppointments(storedAppointments);
    setFiles(storedFiles);
    setIncidents(storedIncidents);
  };

  useEffect(() => {
    loadData();

    window.addEventListener('appointmentsUpdated', loadData);
    window.addEventListener('invoiceUpdated', loadData);
    window.addEventListener('storage', loadData);
    window.addEventListener('focus', loadData);

    return () => {
      window.removeEventListener('appointmentsUpdated', loadData);
      window.removeEventListener('invoiceUpdated', loadData);
      window.removeEventListener('storage', loadData);
      window.removeEventListener('focus', loadData);
    };
  }, []);

  const formatDate = (dateObj) => dateObj.toLocaleDateString('en-CA');

  const getAppointmentsForDate = (date) => {
    const target = formatDate(date);
    return appointments.filter(appt => appt.date === target);
  };

  const getUpcoming = () => {
    return [...appointments]
      .filter(a => new Date(a.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 10);
  };

  const getMonthlyRevenue = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return incidents
      .filter((inv) => {
        const date = new Date(inv.appointmentDate);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .reduce((sum, inv) => sum + (parseFloat(inv.cost) || 0), 0);
  };

  const getTopPatient = () => {
    const counts = {};
    incidents.forEach((inv) => {
      counts[inv.patientId] = (counts[inv.patientId] || 0) + 1;
    });
    const max = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (!max) return 'N/A';

    const patients = JSON.parse(localStorage.getItem('patient')) || [];
    const top = patients.find(p => p.id === max[0]);
    return top ? top.name : 'N/A';
  };

  const getPendingTreatments = () => {
    return incidents.filter((inv) => inv.status === 'Scheduled').length;
  };

  return (
    <div className="flex">
      <Sidebar role="Admin" />
      <div className="flex-1 ml-16 md:ml-64">
        <Header role="Admin" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-orange-100 p-4 rounded shadow">
              <h3 className="text-sm font-semibold text-gray-700">Upcoming Appointments</h3>
              <p className="text-xl font-bold text-orange-800">{getUpcoming().length}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded shadow">
              <h3 className="text-sm font-semibold text-gray-700">Top Patient</h3>
              <p className="text-xl font-bold text-blue-800">{getTopPatient()}</p>
            </div>
            <div className="bg-pink-100 p-4 rounded shadow">
              <h3 className="text-sm font-semibold text-gray-700">Pending Treatments</h3>
              <p className="text-xl font-bold text-pink-800">{getPendingTreatments()}</p>
            </div>
            <div className="bg-green-100 p-4 rounded shadow">
              <h3 className="text-sm font-semibold text-gray-700">Monthly Revenue</h3>
              <p className="text-xl font-bold text-green-800">${getMonthlyRevenue().toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-orange-100 p-6 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Calendar</h2>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="w-full relative left-1/5"
              />
            </div>

            <div className="bg-blue-100 p-6 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">
                Appointments for {formatDate(selectedDate)}
              </h2>
              {getAppointmentsForDate(selectedDate).length > 0 ? (
                <ul className="space-y-2">
                  {getAppointmentsForDate(selectedDate).map((appt, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      <strong>{appt.time}</strong> – {appt.patient} ({appt.status})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No appointments on this date.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pink-100 p-6 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              {getUpcoming().map((appt, i) => (
                <div key={i} className="mb-2">
                  <p className="font-medium text-gray-800">{appt.patient}</p>
                  <p className="text-sm text-gray-600">{appt.treatment || 'Check-up'} · {appt.status}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-100 p-6 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Recent File Uploads</h2>
              {files.length > 0 ? (
                files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-700 text-sm">{file.name}</span>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 text-sm"
                    >
                      View
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No recent files uploaded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;