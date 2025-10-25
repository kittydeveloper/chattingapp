// UserContext.js

import React, { createContext, useContext, useState } from 'react';

const UserContextchat = createContext();

export function useUserchet() {
  return useContext(UserContextchat);
}

export function UserchatProvider({ children }) {
const[chattrigger,setChatTrigger]=useState(false)
const [chatindividual,setChatIndividual]=useState(true)

  

  return (
    <UserContextchat.Provider value={{chattrigger,setChatTrigger,setChatIndividual,chatindividual}}>
      {children}
    </UserContextchat.Provider>
  );
}
