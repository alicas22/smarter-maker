import { useSelector, useDispatch } from "react-redux";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { updateClassThunk } from "../../store/class"
import "react-circular-progressbar/dist/styles.css";
import './ClassHeader.css'

import { ThemeContext, themes } from '../../context/ThemeContext';

function ClassHeader({ allClassesObj }) {
    const { classId } = useParams();
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [errors, setErrors] = useState([])

    const user = useSelector((state) => state.session.user);
    const allDecksObj = useSelector((state) => state.decks.allDecks);
    const allCardsObj = useSelector((state) => state.cards.allCards)

    //focuses input field when edit mode is toggled
    useEffect(() => {
        if (inputRef.current && editMode) {
            inputRef.current.focus();
            setNewName(singleClass.name)
        }
    }, [editMode]);

    if (!allClassesObj || !allDecksObj || !allCardsObj) return null

    const allDecksArr = Object.values(allDecksObj)
    const allClassesArr = Object.values(allClassesObj)
    const singleClass = allClassesArr.find((singleClass) => singleClass.id === +classId)
    const singleClassDecks = allDecksArr.filter((singleDeck) => singleDeck.classId === +classId)
    const allCardsArr = Object.values(allCardsObj)
    const singleClassesCards = allCardsArr.filter(card => {
        return singleClassDecks.some(deck => deck.id === card.deckId);
    });

    let averageMastery
    if (singleClassesCards.length <= 0) averageMastery = 0
    else {
        averageMastery = (singleClassesCards.reduce(
            (total, card) => total + card.mastery,
            0
        ) / (singleClassesCards.length * 5)) * 100;
    }

    //mastery progress bar styles
    const styles = buildStyles({
        strokeLinecap: "butt",
        trailColor: "#ECEFF1",
        pathColor: "#29a5dc",
        textColor: theme === themes.dark ? 'white' : 'black'
      });


    if (!singleClass) return null

    const handleSave = async (e) => {
        e.preventDefault()
        setErrors([])
        const payload = {
            userId: user.id,
            name: newName,
            headline: singleClass.headline,
            description: singleClass.description,
            id: singleClass.id
        }
        const data = await dispatch(updateClassThunk(payload))
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setEditMode(false);
        }
    }

    return (
        <>
            <div className="class-about-container">
                <i className={`fa-solid fa-graduation-cap big-hat ${theme === themes.dark ? 'dark' : 'light'}`}></i>
                <div className="class-about-header">
                    <div className="class-about-sub-button-container">
                        <div className={`class-about-name-pencil  ${theme === themes.dark ? 'dark' : 'light'}`}>
                            {editMode || errors.length > 0 ? (
                                <form
                                    className="class-name-edit-input"
                                    onSubmit={handleSave}
                                    style={{ border: "none" }}>
                                    <ul className="edit-in-place-validation-errors">
                                        {errors.map((error, idx) => (
                                            <li key={idx}>{error}</li>
                                        ))}
                                    </ul>
                                    <input
                                        className={`class-name-edit-input  ${theme === themes.dark ? 'dark' : 'light'}`}
                                        type="text"
                                        ref={inputRef}// assign the reference to the input element
                                        name="newName"
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        placeholder={singleClass.name}
                                    >
                                    </input>
                                    <i className={`fa-solid fa-xmark class-name-edit-x  ${theme === themes.dark ? 'dark' : 'light'}`}
                                        onClick={() => {
                                            setNewName("");
                                            setErrors([]);
                                            setEditMode(false)
                                        }}
                                        style={{ cursor: "pointer" }}></i>
                                    <button
                                        type="submit"
                                        className={`class-name-edit-submit  ${theme === themes.dark ? 'dark' : 'light'}`}
                                        onSubmit={handleSave}>
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                </form>
                            ) : (
                                <>
                                    {singleClass.name}
                                    <i className="fa-solid fa-pencil"
                                        onClick={() => setEditMode(true)} // pass the click handler to the icon
                                        style={{ cursor: 'pointer' }} />
                                </>
                            )}
                        </div>
                        <div className={`class-about-subtitle ${theme === themes.dark ? 'dark' : 'light'}`}>
                            Creator: {user.firstName} {user.lastName}
                            <span className="unique-cards-created">{singleClassesCards.length === 1 ? (
                                <span>{singleClassesCards.length} unique card</span>
                            ) : (
                                <span>{singleClassesCards.length} unique cards</span>
                            )}</span>
                        </div>
                    </div>
                </div>
                <div className={`class-about-mastery-bar-container ${theme === themes.dark ? 'dark' : 'light'}`}>
                    <div style={{ width: '140px' }} >
                        <CircularProgressbar
                            value={averageMastery}
                            text={`${averageMastery.toFixed(1)}%`}
                            strokeWidth={8}
                            styles={styles}
                        >
                        </CircularProgressbar>
                        <div className="class-about-mastery-subtitle">Mastery</div>
                    </div>
                </div>
            </div>
            <div className="class-about-nav-bar">
                <NavLink to={`/dashboard/${classId}/about`}
                    className={`class-about-nav-bar-link ${theme === themes.dark ? 'dark' : 'light'}`}
                    activeClassName={`class-about-nav-bar-link-active ${theme === themes.dark ? 'dark' : 'light'}`}
                    style={{ textDecoration: 'none' }} >
                    About
                </NavLink>
                <NavLink to={`/dashboard/${classId}/decks`}
                     className={`class-about-nav-bar-link ${theme === themes.dark ? 'dark' : 'light'}`}
                    activeClassName={`class-about-nav-bar-link-active ${theme === themes.dark ? 'dark' : 'light'}`}
                    style={{ textDecoration: 'none' }} >
                    Decks ({singleClassDecks.length})
                </NavLink>
            </div>
        </>

    )
}

export default ClassHeader
