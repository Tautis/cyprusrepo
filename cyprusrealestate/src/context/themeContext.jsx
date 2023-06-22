import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const Theme = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'true';
      });
const toggleTheme = () => {
    setTheme(!theme); // Toggle the theme value
};
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};