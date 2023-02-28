import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadAllDecksThunk } from "../../store/deck";
import { useEffect } from "react";
import './CardHeader.css'

function CardHeader() {
    const { classId, deckId } = useParams();
    const dispatch = useDispatch()
    const allDecksObj = useSelector((state) => state.decks.allDecks);
    const allClassesObj = useSelector((state) => state.classes.allClasses);

    if (!allClassesObj || !allDecksObj) return null

    const allDecksArr = Object.values(allDecksObj)
    const allClassesArr = Object.values(allClassesObj)
    const singleClass = allClassesArr.find((singleClass) => singleClass.id === +classId)
    const singleClassDecks = allDecksArr.filter((singleDeck) => singleDeck.classId === +classId)
    const singleDeck = singleClassDecks.find((singleDeck) => singleDeck.id === +deckId)

    return (
        <div className="card-header-container">
            <div className="card-header-back-to-class-container">
                <NavLink to = {`/dashboard/${classId}`}
                style = {{textDecoration:'none',  color:'#777'}}>
                <div className="card-header-arrow-hat-classname">
                    <i className="fa-solid fa-chevron-left"></i>
                    <i className="fa-solid fa-graduation-cap tiny-hat"></i>
                    <span className="card-header-class-name">{singleClass.name}</span>
                </div>
                </NavLink>
                <div className="card-header-deck-name">Deck: {singleDeck.name}</div>
            </div>

            <div className="card-header-nav-bar">
                <NavLink to={`/dashboard/${classId}/decks/${deckId}/preview`}
                    className="card-header-nav-bar-link"
                    activeClassName="card-header-nav-bar-link-active"
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
                    className="card-header-nav-bar-link"
                    activeClassName="card-header-nav-bar-link-active"
                    style={{ textDecoration: 'none' }} >
                    Browse Cards
                </NavLink>
            </div>
        </div >

    )
}
export default CardHeader
