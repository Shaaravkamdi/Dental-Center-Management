import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/shared/Sidebar';
import Header from '../../components/shared/Header';

const Files = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        setFiles(stored);
    }, []);

    const handleFileUpload = (e) => {
        const selected = e.target.files || e.dataTransfer.files;

        const newFiles = Array.from(selected).map((file) => ({
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file)
        }));

        const updated = [...files, ...newFiles];
        setFiles(updated);
        localStorage.setItem('uploadedFiles', JSON.stringify(updated));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFileUpload(e);
    };

    const preventDefaults = (e) => e.preventDefault();

    const handleDelete = (index) => {
        const updated = [...files];
        updated.splice(index, 1);
        setFiles(updated);
        localStorage.setItem('uploadedFiles', JSON.stringify(updated));
    };

    const getIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        switch (ext) {
            case 'pdf':
                return <i className="fa-solid fa-file-pdf text-red-500"></i>;
            case 'png':
            case 'jpg':
            case 'jpeg':
                return <i className="fa-solid fa-image text-green-500"></i>;
            case 'doc':
            case 'docx':
                return <i className="fa-regular fa-file-word text-blue-600"></i>;
            case 'xls':
            case 'xlsx':
                return <i className="fa-solid fa-file-excel text-purple-500"></i>;
            case 'zip':
            case 'rar':
                return <i className="fa-solid fa-file-zipper text-yellow-400"></i>;
            default:
                return <i className="fa-regular fa-file-lines text-gray-500"></i>;
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar role="Admin" />
            <div className="flex-1 md:ml-64">
                <Header role="Admin" />

                <div className="p-4 sm:p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6"> Files</h1>

                    <div
                        onDrop={handleDrop}
                        onDragOver={preventDefaults}
                        className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-white shadow-sm mb-8 transition hover:bg-blue-50"
                    >
                        <i
                            className="fa-solid fa-cloud-arrow-up text-6xl sm:text-8xl text-cyan-300 mb-4"
                        ></i>
                        <p className="text-gray-700 mb-2">Drag & drop files here, or</p>
                        <label className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded cursor-pointer mt-2">
                            Browse Files
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                    </div>


                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Uploaded Files</h2>
                    <div className="space-y-3">
                        {files.length > 0 ? (
                            files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded shadow-sm border gap-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{getIcon(file.name)}</span>
                                        <div>
                                            <p className="font-medium text-gray-800">{file.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {file.type || 'Unknown type'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 justify-end">
                                        <a
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            View
                                        </a>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No files uploaded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Files;
