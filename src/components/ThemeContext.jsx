import { createContext, useState } from 'react';

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const sidebarTheme = {
    primaryColor: isDarkMode ? '#333333' : '#FFFFFF',
    backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    textColor: isDarkMode ? '#FFFFFF' : '#637381',
  };

  const btnTheme = {
    textColor: isDarkMode ? 'rgb(0, 167, 111)' : '#637381',
  };

  return (
    <ThemeContext.Provider value={{ sidebarTheme, btnTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
