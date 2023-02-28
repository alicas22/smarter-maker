import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useState } from 'react';
import './BrowseCards.css'

function BrowseCards() {
    const { deckId } = useParams();
    const [cardNum, setCardNum] = useState(0)
    const [isAnswer, setIsAnswer] = useState(false)

    const allDecksObj = useSelector((state) => state.decks.allDecks);
    const allClassesObj = useSelector((state) => state.classes.allClasses);
    const allCardsObj = useSelector((state) => state.cards.allCards)

    if (!allClassesObj || !allDecksObj || !allCardsObj) return null

    const allCardsArr = Object.values(allCardsObj)
    const singleDecksCards = allCardsArr.filter(card => card.deckId === +deckId);

    if(singleDecksCards.length === 0) return(
        <div className='no-cards-message'>This class does not have any cards.</div>
    )
    const nextSide = () => {
        setIsAnswer(!isAnswer)
    }
    const decrementSlide = () => {
        if (cardNum !== 0) {
            setCardNum(cardNum - 1)
            setIsAnswer(false)
        }
    }
    const incrementSlide = () => {
        if (cardNum !== singleDecksCards.length){
            setCardNum(cardNum + 1)
            setIsAnswer(false)
        }
    }

    const letterClassName = isAnswer ? "card-answer" : "card-question"

    return (
        <div className='browse-deck-container'>
            <div className='arrows-and-card-container'>
                {cardNum === 0 ? (
                    <div className='browse-deck-left-arrow' style={{ color: 'rgba(0, 0, 0, 0)', cursor: 'default' }}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                ) : (
                    <div className='browse-deck-left-arrow back-arrow' onClick={decrementSlide}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                )}
                <div className='browse-deck-display-card'>
                    <div className='browse-deck-card-header'>
                        Card {cardNum + 1} of {singleDecksCards.length}
                    </div>
                    <div className={`browse-deck-card-content card-question ${letterClassName}`}>
                        {!isAnswer ? singleDecksCards[cardNum].question : singleDecksCards[cardNum].answer}
                    </div>
                    <div className='browse-deck-next-button-container'>
                        <button className='browse-deck-next-button' type="button" onClick={nextSide}>
                            {!isAnswer ? "Reveal Answer" : "Reveal Question"}
                        </button>
                    </div>
                </div>
                {cardNum === singleDecksCards.length - 1 ? (
                    <div className='browse-deck-right-arrow' style={{ color: 'rgba(0, 0, 0, 0)', cursor: 'default' }}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                ) : (
                    <div className='browse-deck-right-arrow forward-arrow' onClick={incrementSlide}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                )}
            </div>
        </div>
    )
}
export default BrowseCards
