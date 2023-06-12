import React, { createContext,useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [showAlert, setAlert] = useState(null);
  const value = {
    modalHandler,
    setModalHandler,showAlert, setAlert,
  };

  useEffect(()=>{

    setTimeout(() => {
      
      showAlert?setAlert(null):setAlert(null)
    }, 5000);
      
    },[showAlert])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
