import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import Sidebar from '../../components/shared/Sidebar';
import Header from '../../components/shared/Header';

const InvoiceView = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
        const matchedInvoice = allIncidents.find(inc => inc.appointmentId === id);
        setInvoice(matchedInvoice);

        if (matchedInvoice) {
            const patients = JSON.parse(localStorage.getItem('patient')) || [];
            const relatedPatient = patients.find(p => p.id === matchedInvoice.patientId);
            setPatient(relatedPatient);
        }
    }, [id]);

    const safeText = (label, value) => `${label}: ${value ?? 'N/A'}`;
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
    };
    const generatePDF = () => {
        if (!invoice) return;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Dental Clinic Invoice', 20, 20);

        doc.setFontSize(12);
        let y = 40;

        doc.text(safeText('Invoice Title', invoice.title?.trim() || 'N/A'), 20, y); y += 10;
        doc.text(safeText('Appointment Date', formatDate(invoice.appointmentDate)), 20, y); y += 10;
        doc.text(safeText('Description', invoice.description?.trim() || 'N/A'), 20, y); y += 10;
        doc.text(safeText('Doctor Comments', invoice.comments?.trim() || 'N/A'), 20, y); y += 10;
        doc.text(safeText('Cost', invoice.cost != null ? `$${invoice.cost}` : 'N/A'), 20, y); y += 10;
        doc.text(safeText('Status', invoice.status || 'N/A'), 20, y); y += 10;

        if (patient) {
            doc.text(safeText('Patient Name', patient.name || 'N/A'), 20, y); y += 10;
            doc.text(safeText('Contact', patient.contact || 'N/A'), 20, y); y += 10;
            doc.text(safeText('DOB', formatDate(patient.dob)), 20, y); y += 10;
            doc.text(safeText('Health Info', patient.healthInfo?.trim() || 'N/A'), 20, y); y += 10;
        }

        const imageFiles = invoice.files?.filter(file =>
            /\.(jpe?g|png|gif|bmp|webp)$/i.test(file.name)
        );

        if (imageFiles?.length) {
            doc.text('Attached Images:', 20, y); y += 10;

            const loadImage = (file) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous'; 
                    img.onload = () => resolve({ name: file.name, url: file.url, image: img });
                    img.src = file.url;
                });

            Promise.all(imageFiles.map(loadImage)).then(images => {
                images.forEach(({ name, url, image }) => {
                    const pageHeight = doc.internal.pageSize.height;
                    const pageWidth = doc.internal.pageSize.width;

                    const maxWidth = 150;
                    const aspectRatio = image.width / image.height;
                    const imgHeight = maxWidth / aspectRatio;

                    if (y + imgHeight + 20 > pageHeight) {
                        doc.addPage();
                        y = 20;
                    }

                    doc.text(`- ${name}`, 25, y); y += 5;
                    doc.addImage(image, 'PNG', 25, y, maxWidth, imgHeight);
                    y += imgHeight + 5;


                });

                doc.save(`Invoice-${invoice.appointmentId || 'Unknown'}.pdf`);
            });
        } else {
          
            doc.save(`Invoice-${invoice.appointmentId || 'Unknown'}.pdf`);
        }
    };


    if (!invoice) {
        return (
            <div className="flex">
                <Sidebar role="Admin" />
                <div className="flex-1 md:ml-64 p-6">
                    <Header role="Admin" />
                    <p className="text-gray-600 mt-6">No invoice found for this appointment.</p>
                </div>
            </div>
        );
    }
    console.log(invoice);

    return (
        <div className="flex">
            <Sidebar role="Admin" />
            <div className="flex-1 md:ml-64 p-6">
                <Header role="Admin" />
                <div className="max-w-3xl bg-white p-6 shadow rounded border border-gray-200 mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Invoice for {invoice.title || 'Untitled'}</h2>
                        <button
                            onClick={generatePDF}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Download PDF
                        </button>
                    </div>

                    <p><strong>Appointment Date:</strong> {formatDate(invoice.appointmentDate)}</p>
                    <p><strong>Description:</strong> {invoice.description || 'N/A'}</p>
                    <p><strong>Doctor Comments:</strong> {invoice.comments || 'N/A'}</p>
                    <p><strong>Cost:</strong> {invoice.cost != null ? `$${invoice.cost}` : 'N/A'}</p>
                    <p><strong>Status:</strong> {invoice.status || 'N/A'}</p>

                    {patient && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Patient Details:</h3>
                            <p><strong>Name:</strong> {patient.name || 'N/A'}</p>
                            <p><strong>Contact:</strong> {patient.contact || 'N/A'}</p>
                            <p><strong>DOB:</strong> {formatDate(patient.dob)}</p>
                            <p><strong>Health Info:</strong> {patient.healthInfo || 'N/A'}</p>
                        </div>
                    )}

                    {invoice.files?.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Attached Images:</h3>
                            <ul className="space-y-4">
                                {invoice.files
                                    .filter(file => /\.(jpe?g|png|gif|bmp|webp)$/i.test(file.name)) 
                                    .map((file, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="w-32 h-auto rounded border border-gray-300 shadow"
                                            />
                                            <div className="flex flex-col justify-between">
                                                <p className="font-medium">{file.name || 'Unnamed File'}</p>
                                                <a
                                                    href={file.url}
                                                    download={file.name}
                                                    className="text-blue-600 underline text-sm"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}



                </div>
            </div>
        </div>
    );
};

export default InvoiceView;
