import React, { createContext, useEffect, useState } from "react";
// import {GET } from '../services/httpClient';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState(null);
  const [categoriesList, setCategoriesList] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
    const [isUsersUpdated, setIsUsersUpdated] = useState(false);

  const [snackbarState, setSnackbarState] = useState({
    severity: "",
    open: false,
    message: "",
  });

  const value = {
    isUsersUpdated,
     setIsUsersUpdated,
    setIsUpdated,
    isUpdated,
    categoriesList,
    setCategoriesList,
    isLoading,
    setIsLoading,
    modalHandler,
    snackbarState,
    setSnackbarState,
    setModalHandler,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
