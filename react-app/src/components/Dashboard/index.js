import { Switch, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation";
import Decks from "../Decks";


function Dashboard(isLoaded) {
  const classesSlice = useSelector((state) => state.classes);
  const user = useSelector((state) => state.session.user);
  // const classes = user.class_ids.map((id) => classesSlice[id]);
  const dispatch = useDispatch();
  const history = useHistory();
  const curUrl = useLocation().pathname;

  // if (classes.length > 0 && curUrl === "/dashboard") {
  //   if (classes[0]) history.push(`/dashboard/${classes[0].id}/decks`);
  // }

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-nav-component">
        <Navigation isLoaded={isLoaded} />
      </div>
      <div className="dashboard-deck-component">
        <Decks />
      </div>
    </div>
  );
}

export default Dashboard;
