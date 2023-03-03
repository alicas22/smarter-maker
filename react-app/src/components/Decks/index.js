import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../DeleteModal";
import { loadAllDecksThunk } from '../../store/deck'
import UpdateDeckModal from "../UpdateDeckModal";
import OpenModalButton from "../OpenModalButton";
import CreateDeckModal from "../CreateDeckModal";
import './Decks.css'

//need to be outside component to prevent too many rerenders
const colors = {
    0: "#7D93A4",
    1: "#AA0080",
    2: "#FF8A47",
    3: "#FFDD00",
    4: "#7FAE2E",
    5: "#00A8D7",
};
function getColor(mastery) {
    if (mastery === 0) return colors[0];
    else if (mastery > 0 && mastery < 30) return colors[1];
    else if (mastery >= 30 && mastery < 50) return colors[2];
    else if (mastery >= 50 && mastery < 80) return colors[3];
    else if (mastery >= 80 && mastery < 100) return colors[4];
    else if (mastery === 100) return colors[5];
}


function Decks() {
    const { classId } = useParams();
    const dispatch = useDispatch();
    const allDecksObj = useSelector((state) => state.decks.allDecks)
    const allCardsObj = useSelector((state) => state.cards.allCards)

    useEffect(() => {
        dispatch(loadAllDecksThunk())
    }, [dispatch])

    if (!allDecksObj || !allCardsObj) return null
    const allDecksArr = Object.values(allDecksObj)
    const singleClassDecks = allDecksArr.filter((singleDeck) => singleDeck.classId === +classId)
    const allCardsArr = Object.values(allCardsObj)

    return (
        <>
            <div className="decks-component-container">
                <div className="decks-header-container">
                    <div className="decks-check-title">
                        <i className="fa-solid fa-circle-check"></i>
                        <div className="decks-title">Decks</div>
                    </div>
                    <div className="decks-create-deck-modal" style={{ cursor: "pointer" }}>
                        <OpenModalButton
                            buttonText="+"
                            modalComponent={<CreateDeckModal classId={classId} />}
                            className="decks-create-decks-modal-button"
                        />
                    </div>
                </div>
                {singleClassDecks.map((deck, i) => {
                    const singleDecksCards = allCardsArr.filter((card) => card.deckId === deck.id)
                    const cardsStudied = singleDecksCards.filter((card) => card.mastery > 0);
                    const singleDecksMastery = Math.round(singleDecksCards.map((card) => card.mastery).reduce((total, mastery) => total + mastery, 0) / singleDecksCards.length * 20);
                    const deckColor = getColor(singleDecksMastery);

                    return (
                        <NavLink to={`/dashboard/${classId}/decks/${deck.id}/preview`}
                            style={{ textDecoration: 'none' }}
                            className='card-info-navlink'
                            activeClassName="card-info-navlink-active"
                            key={i}
                        >
                            <div className='decks-class-card' >
                                <i className="fa-solid fa-circle-check"></i>
                                <div className="decks-deck-card-info-container">
                                    <div className="deck-name-progress-bar-container">
                                        <div className="decks-deck-names">{deck.name}
                                            <span className="decks-card-unique-cards">
                                                {cardsStudied.length} of {singleDecksCards.length}  unique cards studied
                                            </span>
                                        </div>
                                        <div className="progress-bar-outer">
                                            <div
                                                className="progress-bar-inner"
                                                style={{
                                                    width: `${singleDecksMastery}%`,
                                                    backgroundColor: deckColor,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="decks-card-crud-buttons" >
                                        <div className="edit-class-modal" onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }} >
                                            <OpenModalButton
                                                onClick={(e) => e.stopPropagation()}
                                                buttonText=<i className="fa-solid fa-pencil card-pencil" ></i>
                                                modalComponent={<UpdateDeckModal deck={deck}
                                                    onClick={(e) => e.stopPropagation()} />}
                                            // className="edit-class-modal"
                                            />
                                        </div>
                                        <div className="decks-delete-deck-button" onClick={(e) => e.preventDefault()}>
                                            <OpenModalButton
                                                onClick={(e) => e.stopPropagation()}
                                                buttonText=<i className="fa-solid fa-xmark deck-xmark"></i>
                                                modalComponent={<DeleteModal itemType={'deck'} itemId={deck.id}
                                                    onClick={(e) => e.stopPropagation()} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </>
    );
}

export default Decks;
