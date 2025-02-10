// context/ThemeContext.jsx
import React, { createContext, useContext, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { blue, pink } from '@mui/material/colors';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = React.useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: blue,
          secondary: pink,
        },
      }),
    [mode]
  );

  // Expose the toggle function globally (not ideal but works for this demo)
  window.__toggleTheme = toggleTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);