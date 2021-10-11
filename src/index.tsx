import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';

import Header from './components/Header';
import Home from './containers/Home';

import { lightTheme, darkTheme } from './theme';
import { DARKMODE_LOCAL } from './utils/config';
import Footer from './components/Footer';


const App: React.FC<{}> = () => {

  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    // Initialize dark mode (app-wide) and update local storage
    const darkModeState = null || localStorage.getItem(DARKMODE_LOCAL);
    if (darkModeState === 'dark') {
      setDarkModeState(true);
    } else {
      setDarkModeState(false);
    }
  }, []);

  /**
   * Updates dark mode state and local storage val
   * @param on true if dark, false if light
   */
  const setDarkMode = (on: boolean) => {
    localStorage.setItem(DARKMODE_LOCAL, on ? 'dark' : 'light');
    setDarkModeState(on);
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <Container maxWidth="lg">
        <CssBaseline />
        <Switch>
          {/* View Org Repos */}
          <Route
            path="/org/:orgname"
            render={(props) => (<Home {...props} />)}
          />
          {/* Redirect home */}
          <Route path="/">
            <Redirect to="/org/netflix" />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
