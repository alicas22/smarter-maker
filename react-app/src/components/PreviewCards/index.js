import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import React from 'react';

import CreateCardModal from '../CreateCardModal';
import UpdateCardModal from '../UpdateCardModal';
import OpenModalButton from "../OpenModalButton";
import DeleteModal from '../DeleteModal';

import './PreviewCards.css'

function PreviewCards() {
       const { deckId } = useParams();
    const allDecksObj = useSelector((state) => state.decks.allDecks);
    const allClassesObj = useSelector((state) => state.classes.allClasses);
    const allCardsObj = useSelector((state) => state.cards.allCards)



    if (!allClassesObj || !allDecksObj || !allCardsObj) return null


    const allCardsArr = Object.values(allCardsObj)
    const singleDecksCards = allCardsArr.filter(card => card.deckId === +deckId);



    return (
        <div className='preview-cards-container'>
            <div className='new-test-container'>

                {singleDecksCards.map((card, i) => (
                    <div className='preview-single-card-outer-container'>
                        <div key={i} className='preview-single-card-inner-container'>
                            <div className='preview-card-question'>
                                {card.question}
                            </div>
                            <div className='preview-card-answer'>
                                {card.answer}
                            </div>
                        </div>
                        <div className='preview-card-crud-container'>
                            <div className='preview-card-delete-card-button'>
                                <OpenModalButton
                                    buttonText=<i className="fa-solid fa-xmark card-x"></i>
                                    modalComponent={<DeleteModal itemType={'card'} itemId={card.id} />} />
                            </div>
                            <div className="update-card-modal" style={{ cursor: "pointer" }}>
                                <OpenModalButton
                                    buttonText=<i className="fa-solid fa-pencil card-pencil"></i>
                                    modalComponent={<UpdateCardModal card={card} />}
                                    className="update-card-modal"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="create-card-modal-container" style={{ cursor: "pointer" }}>
                    <OpenModalButton
                        buttonText="Create new Card"
                        modalComponent={<CreateCardModal deckId={deckId} />}
                        className="create-card-modal"
                    />
                </div>
            </div>
        </div>
    )
}

export default PreviewCards
