import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import SplashPage from "./components/SplashPage";
import Dashboard from "./components/Dashboard";
import { authenticate } from "./store/session";
import SplashPageNav from "./components/SplashPageNav";
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <ProtectedRoute path="/dashboard">
            <Dashboard isLoaded={isLoaded} />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
