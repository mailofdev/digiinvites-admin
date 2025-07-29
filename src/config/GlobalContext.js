import { createContext, useContext, useState } from "react";

// 1️⃣ Create Context
const GlobalContext = createContext();

// 2️⃣ Custom Hook
export const useGlobalContext = () => useContext(GlobalContext);

// 3️⃣ Provider Component
export const GlobalProvider = ({ children }) => {
  const [singlePageWebsite, setSinglePageWebsite] = useState(true); 

  const value = {
    singlePageWebsite,
    setSinglePageWebsite,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
