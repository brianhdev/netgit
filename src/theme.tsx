import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#fc4732'
    },
    secondary: {
      main: '#fff'
    },
    text: {
      primary: '#000',
      secondary: '#000'
    },
    background: {
      default: '#eeeeee',
      paper: '#fff'
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fc4732'
    },
    secondary: {
      main: '#039be5'
    },
    text: {
      primary: '#fff',
      secondary: '#fff'
    },
    background: {
      default: '#191b1c',
      paper: '#232c2e'
    }
  },
});
