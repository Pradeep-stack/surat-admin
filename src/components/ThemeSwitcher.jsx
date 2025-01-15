import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
      
      {isDarkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
    </button>
  );
};

export default ThemeSwitcher;