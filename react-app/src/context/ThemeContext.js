import {createContext } from 'react';

export const themes = {
  light: {
    background: '#fff',
    text: '#000',
  },
  dark: {
    background: '#131516',
    text: '#fff',
  },
};

export const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});
