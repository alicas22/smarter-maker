import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SplashPage from "./components/SplashPage";
import SplashPageNav from "./components/SplashPageNav";
import SplashFooter from "./components/SplashFooter"
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import { authenticate } from "./store/session";
import { useSelector } from 'react-redux';
import SplashVideo from "./components/SplashVideo";

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
    </>
  );
}

export default App;
