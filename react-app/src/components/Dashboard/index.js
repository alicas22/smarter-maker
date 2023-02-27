import { useHistory, useLocation, Switch, Route, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadAllClassesThunk } from "../../store/class";
import Navigation from "../Navigation";
import Decks from "../Decks";
import './Dashboard.css'
import ClassHeader from "../ClassHeader";
import About from "../About";
import CardHeader from "../CardHeader";
import { loadAllDecksThunk } from "../../store/deck";
import { loadAllCardsThunk } from "../../store/card";
import PreviewCards from "../PreviewCards";


function Dashboard(isLoaded) {
  // const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const curUrl = useLocation().pathname;


  useEffect(() => {
    dispatch(loadAllClassesThunk())
    dispatch(loadAllDecksThunk())
    dispatch(loadAllCardsThunk())
}, [dispatch])



  const allClassesObj = useSelector((state) => state.classes.allClasses);
  if (!curUrl.includes('/dashboard/') && allClassesObj) {
    const userClasses = Object.values(allClassesObj);
    if (userClasses.length > 0) {
      history.push(`/dashboard/${userClasses[0].id}/decks`);
    }
  }

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-nav-component">
        <Navigation isLoaded={isLoaded} />
      </div>
      <div className="dashboard-rest-of-page">
        <Switch>
          <Route path="/dashboard/:classId/decks/:deckId/preview" >
            <CardHeader />
            <PreviewCards />
          </Route>
          <Route path="/dashboard/:classId/about">
            <ClassHeader />
            <About />
          </Route>
          <Route path="/dashboard/:classId" >
            <ClassHeader />
            <Decks />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
