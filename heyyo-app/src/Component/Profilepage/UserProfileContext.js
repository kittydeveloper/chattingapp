// UserContext.js

import React, { createContext, useContext, useState } from 'react';

const UserContextprofile = createContext();

export function useUserprofile() {
  return useContext(UserContextprofile);
}

export function UserprofieProvider({ children }) {

  const [Profileimagetriggger,setprofieimagetrigger] = useState(false)
console.log(Profileimagetriggger,"cccccccccccccccc")
 
  return (
    <UserContextprofile.Provider value={{ Profileimagetriggger,setprofieimagetrigger }}>
      {children}
    </UserContextprofile.Provider>
  );
}
