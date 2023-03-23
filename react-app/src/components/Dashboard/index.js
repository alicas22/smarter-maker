import { useHistory, useLocation, Switch} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext  } from "react";
import { loadAllClassesThunk } from "../../store/class";
import { cleanUpClassesAction } from "../../store/class";
import { loadAllDecksThunk } from "../../store/deck";
import { loadAllCardsThunk } from "../../store/card";
import ProtectedRoute from "../auth/ProtectedRoute";
import Navigation from "../Navigation";
import Decks from "../Decks";
import './Dashboard.css'
import ClassHeader from "../ClassHeader";
import About from "../About";
import CardHeader from "../CardHeader";
import PreviewCards from "../PreviewCards";
import BrowseCards from "../BrowseCards";



import { ThemeContext, themes } from '../../context/ThemeContext';

function Dashboard(isLoaded) {
  const { theme } = useContext(ThemeContext);
  const user = useSelector((state) => state.session.user);
  const allClassesObj = useSelector((state) => state.classes.allClasses);
  const dispatch = useDispatch();
  const history = useHistory();
  const url = useLocation().pathname;
  const [redirectClass, setRedirectClass] = useState(false);


  useEffect(() => {
    dispatch(loadAllClassesThunk())
    dispatch(loadAllDecksThunk())
    dispatch(loadAllCardsThunk())
  }, [dispatch])

  useEffect(() => { //redirects to first class if there is one when sent to /dashboard
    if (isLoaded && !redirectClass && url === '/dashboard' && allClassesObj && user) {
      const userClasses = Object.values(allClassesObj);
      if (userClasses.length > 0) {
        history.push(`/dashboard/${userClasses[0].id}/decks`);
        setRedirectClass(true);
      }
    } else if (url !== '/dashboard') { //allows redirects to work when class is deleted from navigation
      setRedirectClass(false);
    }
  }, [url, allClassesObj, history, redirectClass])


  return (
    <div className="dashboard-page-container"
    style={{ background: theme.background, color: theme.text }}
    >
      <div className="dashboard-nav-component">
        <Navigation isLoaded={isLoaded} />
      </div>
      <div className="dashboard-rest-of-page">
        {allClassesObj && Object.values(allClassesObj).length > 0 ? (
          <Switch>
            <ProtectedRoute path="/dashboard/:classId/decks/:deckId/browse" >
              <CardHeader />
              <BrowseCards />
            </ProtectedRoute>
            <ProtectedRoute path="/dashboard/:classId/decks/:deckId/preview" >
              <CardHeader />
              <PreviewCards />
            </ProtectedRoute>
            <ProtectedRoute path="/dashboard/:classId/about">
              <ClassHeader allClassesObj={allClassesObj} />
              <About />
            </ProtectedRoute>
            <ProtectedRoute path="/dashboard/:classId/decks" >
              <ClassHeader allClassesObj={allClassesObj} />
              <Decks />
            </ProtectedRoute>
          </Switch>
        ) : (
          <div className={`no-classes-message-container ${theme === themes.dark ? 'dark' : 'light'}`}>
            <div className={`no-classes-message-header ${theme === themes.dark ? 'dark' : 'light'}`}>
              No Classes Available
            </div>
            <div className={`no-classes-message-subheader${theme === themes.dark ? 'dark' : 'light'}`}>
              Please create one to your left to get started
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
