import { useParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { useContext } from "react";
import './CardHeader.css'
import { ThemeContext, themes } from '../../context/ThemeContext';

function CardHeader() {
    const { classId, deckId } = useParams();
    const { theme } = useContext(ThemeContext);
    const allDecksObj = useSelector((state) => state.decks.allDecks);
    const allClassesObj = useSelector((state) => state.classes.allClasses);
    const allCardsObj = useSelector((state) => state.cards.allCards)

    if (!allClassesObj || !allDecksObj || !allCardsObj) return null

    const allDecksArr = Object.values(allDecksObj)
    const allClassesArr = Object.values(allClassesObj)
    const allCardsArr = Object.values(allCardsObj)
    const singleClass = allClassesArr.find((singleClass) => singleClass.id === +classId)
    const singleClassDecks = allDecksArr.filter((singleDeck) => singleDeck.classId === +classId)
    const singleDeck = singleClassDecks.find((singleDeck) => singleDeck.id === +deckId)
    const singleDecksCards = allCardsArr.filter(card => card.deckId === +deckId);



    return (
        <div className="card-header-container">
            <div className="card-header-back-to-class-container">
                <NavLink to={`/dashboard/${classId}/decks`}
                    style={{ textDecoration: 'none', color: '#777' }}>
                    <div className="card-header-arrow-hat-classname">
                        <i className="fa-solid fa-chevron-left card-header-left"></i>
                        <i className={`fa-solid fa-graduation-cap tiny-hat ${theme === themes.dark ? 'dark' : 'light'}`}></i>
                        <span className={`card-header-class-name ${theme === themes.dark ? 'dark' : 'light'}`}>{singleClass.name}</span>
                    </div>
                </NavLink>
                <div className={`card-header-deck-name ${theme === themes.dark ? 'dark' : 'light'}`}>Deck: {singleDeck.name}</div>
            </div>

            <div className="card-header-nav-bar">
                <NavLink to={`/dashboard/${classId}/decks/${deckId}/preview`}
                    className={`card-header-nav-bar-link ${theme === themes.dark ? 'dark' : 'light'}`}
                    activeClassName={`card-header-nav-bar-link-active ${theme === themes.dark ? 'dark' : 'light'}`}
                    style={{ textDecoration: 'none' }} >
                    Preview Cards
                </NavLink>
                {/* <NavLink to={`/dashboard/${classId}/decks/${deckId}/edit`}
                    className="card-header-nav-bar-link"
                    activeClassName="card-header-nav-bar-link-active"
                    style={{ textDecoration: 'none' }} >
                    Edit Cards
                </NavLink> */}
                <NavLink to={`/dashboard/${classId}/decks/${deckId}/browse`}
                    className={`card-header-nav-bar-link ${theme === themes.dark ? 'dark' : 'light'}`}
                    activeClassName={`card-header-nav-bar-link-active ${theme === themes.dark ? 'dark' : 'light'}`}
                    style={{ textDecoration: 'none' }} >
                    Browse Cards
                </NavLink>
            </div>
        </div >

    )
}
export default CardHeader
