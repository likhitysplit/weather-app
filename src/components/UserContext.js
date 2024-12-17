import React, { createContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

export const UserContext = createContext();

const SECRET_KEY = 'pleasedebutduanxingxing';

export const UserProvider = ({ children }) => {
  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  };

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const [users, setUsers] = useState(() => {
    const savedUsers = sessionStorage.getItem('users');
    if (savedUsers) {
      try {
        const decryptedUsers = decryptData(savedUsers);
        return JSON.parse(decryptedUsers);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = sessionStorage.getItem('loggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const setPremium = (username, isPremium) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === username ? { ...user, premium: isPremium } : user
      )
    );

    if (loggedInUser?.username === username) {
      setLoggedInUser({ ...loggedInUser, premium: isPremium });
    }
  };

  useEffect(() => {
    const encryptedUsers = encryptData(JSON.stringify(users));
    sessionStorage.setItem('users', encryptedUsers);
  }, [users]);

  useEffect(() => {
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  return (
    <UserContext.Provider value={{ users, setUsers, loggedInUser, setLoggedInUser, setPremium }}>
      {children}
    </UserContext.Provider>
  );
};
