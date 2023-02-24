import React from "react";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./SplashPageNav.css";

const SplashPageNav = () => {
  return (
    <div className="splash-page-nav-container">
      <div className="splash-page-nav-logo">
      <i class="fa-solid fa-head-side-virus"></i>
      <p className="splash-page-nav-bar-app-name">Smarter-Maker</p>
      </div>
      <div className="splash-page-nav-link-container">
        <div className="splash-page-nav-login-modal">
        <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
            className="login-modal-open-button"
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
    </div>
  );
};

export default SplashPageNav;
