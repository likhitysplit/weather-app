import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([
        { username: "likhi", password: "127", role: "admin" },
        { username: "flynn", password: "papillon", role: "regular" },
        { username: "noaccess", password: "no", role: "restricted" },
    ]);

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
};