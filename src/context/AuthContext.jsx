import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const hardcodedUsers = [
    { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
    { id: '2', role: 'Patient', email: 'john@entnt.in', password: 'patient123', patientId: 'p1' }
];

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() =>
        JSON.parse(localStorage.getItem('currentUser')) || null
    );

    const login = (email, password) => {
        const user = hardcodedUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userId', user.id);
            if (user.role === 'Patient') {
                localStorage.setItem('patientId', user.patientId);
            }
            return user.role;
        }
        return null;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
