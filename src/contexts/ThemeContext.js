// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

// ThemeContext.js
useEffect(() => {
  const savedTheme = localStorage.getItem('app-theme') || 'light';
  setTheme(savedTheme);
  document.body.classList.toggle('dark', savedTheme === 'dark');
}, []);

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('app-theme', newTheme);
  document.body.classList.toggle('dark', newTheme === 'dark');
};


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);
