import { Switch, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation";
import Decks from "../Decks";
import './Dashboard.css'
import ClassAbout from "../ClassAbout";


function Dashboard(isLoaded) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const curUrl = useLocation().pathname;
  // const allClassesObj = useSelector((state) => state.classes.allClasses);

  // if (!allClassesObj) return null
  // const userClasses = Object.values(allClassesObj)
  // if (userClasses.length > 0 && curUrl === "/dashboard") {
  //   if (userClasses[0]) history.push(`/dashboard/${userClasses[0].id}/decks`);
  // }

  return (
    <div className="dashboard-page-container">

      <div className="dashboard-nav-component">
        <Navigation isLoaded={isLoaded} />
      </div>
      <div className="dashboard-rest-of-page">
        <ClassAbout />
        <Decks />
      </div>
    </div>
  );
}

export default Dashboard;
