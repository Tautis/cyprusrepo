import React, { createContext, useState } from 'react';

export const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
  const [details, setDetails] = useState({
    region: '',
    type: '',
    noRooms: '',
    keyword: '',
    priceRange: '',
    currency: '',
    sortBy: '',
  });

  return (
    <DetailsContext.Provider value={{ details, setDetails }}>
      {children}
    </DetailsContext.Provider>
  );
};