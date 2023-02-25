import { useState, useEffect } from "react";
import { Switch, useHistory, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation";
import { loadAllDecksThunk, deleteDeckThunk } from '../../store/deck'
import UpdateDeckModal from "../UpdateDeckModal";
import OpenModalButton from "../OpenModalButton";
import CreateDeckModal from "../CreateDeckModal";
import './Decks.css'


function Decks() {
    const { classId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const allDecksObj = useSelector((state) => state.decks.allDecks)

    useEffect(() => {
        dispatch(loadAllDecksThunk())
    }, [dispatch])

    if (!allDecksObj) return null
    const allDecksArr = Object.values(allDecksObj)
    const singleClassDecks = allDecksArr.filter((singleDeck) => singleDeck.classId === +classId)


    const deleteButton = (async (e, id) => {
        e.preventDefault()
        await dispatch(deleteDeckThunk(id))
    })


    return (
        <>
            <div className="decks-component-container">
                <div className="decks-header-container">
                    <div className="decks-check-title">
                        <i class="fa-solid fa-circle-check"></i>
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
                {singleClassDecks.map((deck) => (
                    <div className='decks-class-card'>
                        <i class="fa-solid fa-circle-check"></i>
                        <div className="decks-deck-card-info-container">
                            <div className="decks-deck-names">{deck.name}</div>
                            <div className="decks-card-crud-buttons">
                                <div className="edit-class-modal" style={{ cursor: "pointer" }}>
                                    {/* <i class="fa-solid fa-pencil"></i> */}
                                    <OpenModalButton
                                        buttonText=<i class="fa-solid fa-pencil"></i>
                                        modalComponent={<UpdateDeckModal deckId={deck.id} classId={deck.classId} />}
                                    // className="edit-class-modal"
                                    />
                                </div>
                                <div className='decks-delete-deck-button' onClick={e => deleteButton(e, deck.id)}><i class="fa-solid fa-xmark"></i></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>

    );
}

export default Decks;
