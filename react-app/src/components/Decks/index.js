import { useState, useEffect } from "react";
import { Switch, useHistory, useParams, useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../DeleteModal";
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
                {singleClassDecks.map((deck, i) => (
                    <NavLink to={`/dashboard/${classId}/decks/${deck.id}/preview`}
                        style={{ textDecoration: 'none' }}
                        className='card-info-navlink'
                        activeClassName="card-info-navlink-active"
                        key={i}

                    >
                        <div className='decks-class-card' >
                            <i className="fa-solid fa-circle-check"></i>
                            <div className="decks-deck-card-info-container">
                                <div className="decks-deck-names">{deck.name}</div>
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
                                    <div className="decks-delete-deck-button"  onClick={(e) => e.preventDefault()}>
                                        <OpenModalButton
                                        onClick={(e) => e.stopPropagation()}
                                            buttonText=<i className="fa-solid fa-xmark"></i>
                                            modalComponent={<DeleteModal itemType={'deck'} itemId={deck.id}
                                            onClick={(e) => e.stopPropagation()}  />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>

        </>

    );
}

export default Decks;
