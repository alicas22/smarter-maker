import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadAllClassesThunk } from "../../store/class";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Decks from "../Decks";
import './ClassAbout.css'

function ClassAbout() {
    const { classId } = useParams();
    // const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    const allDecksObj = useSelector((state) => state.decks.allDecks);
    const allClassesObj = useSelector((state) => state.classes.allClasses);

    // useEffect(() => {
    //     dispatch(loadAllClassesThunk())
    // }, [dispatch])
    if (!allClassesObj || !allDecksObj) return null

    const allDecksArr = Object.values(allDecksObj)
    const allClassesArr = Object.values(allClassesObj)
    const singleClass = allClassesArr.find((singleClass) => singleClass.id === +classId)
    const singleClassDecks = allDecksArr.filter((singleDeck) => singleDeck.classId === +classId)
    // console.log('singleClass from ClassAbout', singleClass)



    return (
        <>
            <div className="class-about-container">

                <i class="fa-solid fa-graduation-cap big-hat"></i>
                <div className="class-about-header">
                    <div className="class-about-sub-button-container">
                        <div className="class-about-name-pencil">
                            {singleClass.name}
                            <i class="fa-solid fa-pencil"></i>
                        </div>
                        <div className="class-about-subtitle">
                            Creator: {user.firstName} {user.lastName} Add number of cards here
                        </div>
                        <div className="class-about-study button">
                            <NavLink to={`/dashboard/${classId}/decks/`}>Study</NavLink>
                        </div>
                    </div>
                </div>

            </div>
            <div className="class-about-nav-bar">
                <NavLink to={`/dashboard/${classId}/about`}
                    className="class-about-nav-bar-link"
                    activeClassName="class-about-nav-bar-link-active"
                    style={{ textDecoration: 'none' }} >
                    About
                </NavLink>
                <NavLink to={`/dashboard/${classId}/decks`}
                    className="class-about-nav-bar-link"
                    activeClassName="class-about-nav-bar-link-active"
                    style={{ textDecoration: 'none' }} >
                    Decks ({singleClassDecks.length})
                </NavLink>
            </div>
            <div className="class-about-bottom-half">

            </div>
        </>

    )
}

export default ClassAbout
