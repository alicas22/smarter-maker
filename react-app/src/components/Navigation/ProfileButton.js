import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css"
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
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
          <>
            <div onClick={handleLogout} className='button-container-signout1' style={{ padding: '9px', cursor: 'pointer' }}>
              <i style={{ paddingRight: '5px' }} class="fa-solid fa-arrow-right-from-bracket"></i>
              Log Out
            </div>
          </>
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
