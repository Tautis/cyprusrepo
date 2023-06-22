import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [selectedLanguage2, setSelectedLanguage2] = useState(localStorage.getItem('selectedLanguage') || navigator.language);


  return (
    <LanguageContext.Provider value={{ selectedLanguage2, setSelectedLanguage2 }}>
      {children}
    </LanguageContext.Provider>
  );
};