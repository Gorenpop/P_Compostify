import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function ButtonTheme() {
  const [isDark, setIsDark] = useState(Cookies.get('theme') === 'dark');

  useEffect(() => {
    Cookies.set('theme', isDark ? 'dark' : 'light', { path: '/', expires: 7 });
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    window.location.reload();
  };

  const icon = isDark ? <Brightness7Icon /> : <Brightness4Icon />;

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Button onClick={toggleTheme} color="inherit">
          {icon}
      </Button>
    </ThemeProvider>

  );
}
