import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SplashPage from "./components/SplashPage";
import SplashPageNav from "./components/SplashPageNav";
import SplashFooter from "./components/SplashFooter"
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import { authenticate } from "./store/session";
import SplashVideo from "./components/SplashVideo";

import { ThemeContext, themes} from './context/ThemeContext';

function App() {
  const { theme, toggleTheme  } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  //add darkmode to body
  useEffect(() => {
    if (theme === themes.dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  //load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      toggleTheme();
    }
  }, []);

  return (
    <div className='app-container'>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
            <SplashVideo />
            <SplashFooter />
          </Route>
          <ProtectedRoute path="/dashboard">
            <Dashboard isLoaded={isLoaded} />
          </ProtectedRoute>
          <Route path="*">
            <SplashPageNav />
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
