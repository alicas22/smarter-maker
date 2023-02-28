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
import BrowseCards from "../BrowseCards";



function Dashboard(isLoaded) {
  // const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const url = useLocation().pathname;
  const [redirectToDefaultClass, setRedirectToDefaultClass] = useState(false);

  useEffect(() => {
    dispatch(loadAllClassesThunk())
    dispatch(loadAllDecksThunk())
    dispatch(loadAllCardsThunk())
  }, [dispatch])



  const allClassesObj = useSelector((state) => state.classes.allClasses);

  useEffect(() => {
    if (!redirectToDefaultClass && url === '/dashboard' && allClassesObj) {
      const userClasses = Object.values(allClassesObj);
      if (userClasses.length > 0) {
        history.push(`/dashboard/${userClasses[0].id}/decks`);
        setRedirectToDefaultClass(true);
      }
    }
  }, [url, allClassesObj, history, redirectToDefaultClass])

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-nav-component">
        <Navigation isLoaded={isLoaded} />
      </div>
      <div className="dashboard-rest-of-page">
        {allClassesObj && Object.values(allClassesObj).length > 0 ? (
          <Switch>
            <Route path="/dashboard/:classId/decks/:deckId/preview" >
              <CardHeader />
              <PreviewCards />
            </Route>
            <Route path="/dashboard/:classId/decks/:deckId/browse" >
              <CardHeader />
              <BrowseCards />
            </Route>
            <Route path="/dashboard/:classId/about">
              <ClassHeader allClassesObj={allClassesObj}   />
              <About />
            </Route>
            <Route path="/dashboard/:classId/decks" >
              <ClassHeader allClassesObj={allClassesObj}  />
              <Decks />
            </Route>
          </Switch>
        ) : (
          <div className="no-classes-message-container">
            <div className="no-classes-message-header">
              No Classes Avaialable
            </div>
            <div className="no-classes-message-subheader">
              Please create one to your left to get started

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
