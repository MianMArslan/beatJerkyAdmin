import React, { createContext, useEffect, useState } from "react";
// import {GET } from '../services/httpClient';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [editModalHandler, setEditModalHandler] = useState(false);
  const [editSongData, setEditSongData] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState(null);
  const [storeCategoriesList, setStoreCategoriesList] = useState(null);
  const [musicStyleCategoriesList, setMusicStyleCategoriesList] =
    useState(null);

  const [isUpdated, setIsUpdated] = useState(false);

  const [modalType, setModalType] = useState(null);

  const [isUsersUpdated, setIsUsersUpdated] = useState(false);

  const [snackbarState, setSnackbarState] = useState({
    severity: "",
    open: false,
    message: "",
  });

  const value = {
    modalType,
    setModalType,
    editSongData,
    setEditSongData,
    editModalHandler,
    setEditModalHandler,
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
    musicStyleCategoriesList,
    setMusicStyleCategoriesList,
    storeCategoriesList,
    setStoreCategoriesList,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
