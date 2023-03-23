import React, { useContext }from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./SplashPageNav.css";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { ThemeContext, themes } from '../../context/ThemeContext';

const SplashPageNav = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <div className={`splash-page-nav-link-container ${theme === themes.dark ? 'dark' : 'light'}`}>
        <div className={`splash-page-nav-logout-button ${theme === themes.dark ? 'dark' : 'light'}`}
          onClick={handleLogout}>
          Log Out
        </div>
        <NavLink to='/dashboard'
          style={{ textDecoration: 'none' }}
          className={`splash-page-nav-dashboard-link ${theme === themes.dark ? 'dark' : 'light'}`}>
          <div >
            Dashboard
          </div>
        </NavLink>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="splash-page-nav-link-container">
        <div className={`splash-page-nav-login-modal ${theme === themes.dark ? 'dark' : 'light'}`}>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
            className={`login-modal-open-button ${theme === themes.dark ? 'dark' : 'light'}`}
          />
        </div>
        <div className="splash-page-nav-signup-modal">
          <OpenModalButton
            buttonText="Get Started"
            modalComponent={<SignupFormModal />}
            className="signup-modal-open-button"
          />
        </div>
      </div>
    )
  }
  return (
    <div className={`splash-page-nav-container ${theme === themes.dark ? 'dark' : 'light'}`}>
      <div className="splash-page-nav-logo">
        <NavLink to='/dashboard'
          style={{ textDecoration: 'none' }}
          className="splash-page-nav-logo-link">
          <i className="fa-solid fa-head-side-virus"></i>
          <p className={`splash-page-nav-bar-app-name ${theme === themes.dark ? 'dark' : 'light'}`}>Smarter-Maker</p>
        </NavLink>
      </div>
      {sessionLinks}

    </div>
  );
};

export default SplashPageNav;
