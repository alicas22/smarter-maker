import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from '../../context/ThemeContext';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { cleanUpClassesAction } from "../../store/class";
import { cleanUpDecksAction } from "../../store/deck";

import "./Navigation.css"
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async(e) => {
    e.preventDefault();
    await dispatch(cleanUpClassesAction())
    await dispatch(cleanUpDecksAction())
    await dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);



  return (
    <>
      <div className="nav-bar-user-gear" onClick={openMenu}>
        <i className={`fa-solid fa-gear ${showMenu ? "fa-gear-click" : ""}`}></i>
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user && (
          <div className="nav-drop-down-menu">
            <div className='button-container-signout1' >
              <div onClick={toggleTheme} className='button-container-signout1'>Toggle Theme</div>
            </div>
            <div onClick={handleLogout} className='button-container-signout2-container' >
              <div className='button-container-signout2'>
                <i style={{ paddingRight: '20px' }} class="fa-solid fa-arrow-right-from-bracket"></i>
                Log Out
              </div>
            </div>
          </div>
          // )} : (
          // <>
          //   <OpenModalButton
          //     buttonText="Log In"
          //     onItemClick={closeMenu}
          //     modalComponent={<LoginFormModal />}
          //   />

          //   <OpenModalButton
          //     buttonText="Sign Up"
          //     onItemClick={closeMenu}
          //     modalComponent={<SignupFormModal />}
          //   />
          // </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
