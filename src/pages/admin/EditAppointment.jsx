import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/shared/Sidebar';
import Header from '../../components/shared/Header';
import jsPDF from 'jspdf';

const EditAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);
    const [showInvoiceForm, setShowInvoiceForm] = useState(false);
    const [incidentData, setIncidentData] = useState({
        title: '',
        description: '',
        comments: '',
        cost: '',
        status: 'Completed',
        files: [],
    });

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const found = storedAppointments.find((appt) => appt.id === id);
        if (found) setAppointment(found);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment((prev) => ({ ...prev, [name]: value }));
    };

    const handleIncidentChange = (e) => {
        const { name, value } = e.target;
        setIncidentData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setIncidentData((prev) => ({
                ...prev,
                files: [...prev.files, { name: file.name, url: reader.result }],
            }));
        };
        if (file) reader.readAsDataURL(file);
    };

    
    const generateInvoicePDF = (appointment, data) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Dental Clinic Invoice', 20, 20);

        doc.setFontSize(12);
        doc.text(`Patient Name: ${appointment.patient}`, 20, 40);
        doc.text(`Appointment Date: ${new Date(appointment.date).toLocaleDateString()}`, 20, 50);
        doc.text(`Treatment Title: ${data.title}`, 20, 60);
        doc.text(`Description: ${data.description}`, 20, 70);
        doc.text(`Doctor Comments: ${data.comments}`, 20, 80);
        doc.text(`Cost: $${data.cost}`, 20, 90);
        doc.text(`Status: ${data.status}`, 20, 100);

        return doc.output('dataurlstring');
    };

    const handleSave = () => {
        const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const updatedAppointments = allAppointments.map((appt) =>
            appt.id === id ? appointment : appt
        );
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        window.dispatchEvent(new Event('appointmentsUpdated'));
        navigate('/appointment');
    };


    const handleGenerateInvoice = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || currentUser.role !== 'Admin') return;

        const title = document.querySelector('input[name="title"]')?.value || '';
        const description = document.querySelector('textarea[name="description"]')?.value || '';
        const comments = document.querySelector('input[name="comments"]')?.value || '';
        const cost = document.querySelector('input[name="cost"]')?.value || '';

        if (!title || !description || !comments || !cost) {
            alert("Please fill in all invoice fields.");
            return;
        }

        const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];

        if (!appointment?.patientId || !appointment.date) {
            alert('Missing patient or appointment information.');
            return;
        }

        const invoiceData = {
            title,
            description,
            comments,
            cost: parseFloat(cost),
            status: 'Completed',
            files: incidentData.files, 
        };

        const invoicePDF = generateInvoicePDF(appointment, invoiceData);
        const pdfFile = {
            name: 'invoice.pdf',
            url: invoicePDF,
        };

        const newInvoice = {
            id: `i${Date.now()}`,
            appointmentId: appointment.id,
            patientId: appointment.patientId,
            appointmentDate: appointment.date,
            ...invoiceData,
            files: [...(incidentData.files || []), pdfFile],
        };

        const updatedIncidents = [...allIncidents, newInvoice];
        localStorage.setItem('incidents', JSON.stringify(updatedIncidents));
        window.dispatchEvent(new Event('invoiceUpdated'));

        const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const updatedAppointments = allAppointments.map((appt) =>
            appt.id === appointment.id ? { ...appt, status: 'Completed' } : appt
        );
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        setAppointment((prev) => ({ ...prev, status: 'Completed' }));

        alert('Invoice generated and saved successfully!');
        setShowInvoiceForm(false);
    };



    if (!appointment) {
        return <div className="p-6 text-gray-600">Loading appointment...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar role="Admin" />
            <div className="flex-1 md:ml-64 bg-baby-powder min-h-screen">
                <Header role="Admin" />
                <div className="p-6 max-w-3xl mx-auto w-full">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Appointment</h1>

                    <div className="space-y-4 bg-white p-6 rounded shadow">
                        <input
                            type="text"
                            name="patient"
                            value={appointment.patient}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                            placeholder="Patient Name"
                        />
                        <input
                            type="date"
                            name="date"
                            value={appointment.date}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                        />
                        <input
                            type="time"
                            name="time"
                            value={appointment.time}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                        />
                        <input
                            type="text"
                            name="dentist"
                            value={appointment.dentist}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                            placeholder="Dentist"
                        />
                        <select
                            name="status"
                            value={appointment.status}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                        >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                        </select>

                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                            >
                                Save Appointment
                            </button>

                            {appointment.status === 'Completed' && !showInvoiceForm && (
                                <button
                                    onClick={() => setShowInvoiceForm(true)}
                                    className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                                >
                                    Generate Invoice
                                </button>
                            )}
                        </div>
                    </div>

                    {showInvoiceForm && (
                        <div className="mt-8 p-6 bg-white rounded shadow space-y-4">
                            <h2 className="text-xl font-semibold text-gray-700">Treatment Details</h2>

                            <input
                                type="text"
                                name="title"
                                placeholder="Treatment Title"
                                value={incidentData.title}
                                onChange={handleIncidentChange}
                                className="w-full p-3 border rounded"
                            />
                            <textarea
                                name="description"
                                placeholder="Treatment Description"
                                value={incidentData.description}
                                onChange={handleIncidentChange}
                                className="w-full p-3 border rounded"
                            ></textarea>
                            <input
                                type="text"
                                name="comments"
                                placeholder="Doctor Comments"
                                value={incidentData.comments}
                                onChange={handleIncidentChange}
                                className="w-full p-3 border rounded"
                            />
                            <input
                                type="number"
                                name="cost"
                                placeholder="Cost"
                                value={incidentData.cost}
                                onChange={handleIncidentChange}
                                className="w-full p-3 border rounded"
                            />
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                className="w-full"
                            />

                            <button
                                onClick={handleGenerateInvoice}
                                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                            >
                                Save Record
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditAppointment;
