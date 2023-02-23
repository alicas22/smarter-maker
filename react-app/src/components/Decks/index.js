import { useState, useEffect } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation";
import {loadAllDecksThunk, deleteDeckThunk} from '../../store/deck'
import UpdateDeckModal from "../UpdateDeckModal";
import OpenModalButton from "../OpenModalButton";
import CreateDeckModal from "../CreateDeckModal";


function Decks() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const allDecksObj = useSelector((state)=> state.decks.decks)

	useEffect(() => {
        dispatch(loadAllDecksThunk())
	}, [dispatch])

    if(!allDecksObj) return null
    const allDecksArr = Object.values(allDecksObj)


    const deleteButton = (async (e, id) => {
        e.preventDefault()
        await dispatch(deleteDeckThunk(id))
    })


    return (
        <>
        <h1>Decks</h1>
        {allDecksArr.map((deck) => (
					<div>
						<h3>{deck.name}</h3>
						<button onClick={e=> deleteButton(e, deck.id)}>Delete Deck</button>
						<div className="edit-class-modal" style = {{cursor:"pointer"}}>
                                <OpenModalButton
                                    buttonText="Update Deck"
                                    modalComponent={<UpdateDeckModal deckId={deck.id} classId={deck.classId}  />}
                                />
                            </div>
					</div>
				))}

        </>

    );
  }

  export default Decks;
