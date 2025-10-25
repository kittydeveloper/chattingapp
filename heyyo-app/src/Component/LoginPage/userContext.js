// UserContext.js

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userdashboard,setUserdashboard] = useState(false)

  const loginUser = (username) => {
    setUser({ username });
  };

  return (
    <UserContext.Provider value={{ user, loginUser,userdashboard,setUserdashboard }}>
      {children}
    </UserContext.Provider>
  );
}
