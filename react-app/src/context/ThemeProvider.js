import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './ThemeContext';

export default function ThemeProvider(props) {
  const [theme, setTheme] = useState(themes.light);


  function toggleTheme() {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  }

  //checks if there is a saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'dark' ? themes.dark : themes.light);
    }
  }, []);

  //save them whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme === themes.dark ? 'dark' : 'light');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
