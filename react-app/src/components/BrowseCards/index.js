import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { updateCardThunk } from '../../store/card';
import './BrowseCards.css'
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';


function BrowseCards() {

    const { deckId } = useParams();
    const dispatch = useDispatch();
    const [cardNum, setCardNum] = useState(0)
    const [isAnswer, setIsAnswer] = useState(false)
    const [color, setColor] = useState(0);
    const colors = {
        0: "#7D93A4",
        1: "#AA0080",
        2: "#FF8A47",
        3: "#FFDD00",
        4: "#7FAE2E",
        5: "#00A8D7",
    };

    const allDecksObj = useSelector((state) => state.decks.allDecks);
    const allClassesObj = useSelector((state) => state.classes.allClasses);
    const allCardsObj = useSelector((state) => state.cards.allCards)

    useEffect(() => {
        if (!allClassesObj || !allDecksObj || !allCardsObj) return;
        const allCardsArr = Object.values(allCardsObj);
        const singleDecksCards = allCardsArr.filter(
            (card) => card.deckId === +deckId
        );
        if (singleDecksCards.length <= 0) return null
        else setColor(colors[singleDecksCards[cardNum].mastery]);
    }, [allCardsObj, allClassesObj, allDecksObj, cardNum, deckId]);



    const singleDecksCards = useMemo(() => {
        if (!allClassesObj || !allDecksObj || !allCardsObj) return [];
        const allCardsArr = Object.values(allCardsObj);
        const cards = allCardsArr.filter((card) => card.deckId === +deckId)
        if (cards.length === 0) return [];
        return cards;
    }, [allCardsObj, allClassesObj, allDecksObj, deckId]);

    if (singleDecksCards.length === 0) return (
        <div className="no-cards-message">
            This class does not have any cards.
        </div>
    );

    //navigate deck with arrows
    const nextSide = () => {
        setIsAnswer(!isAnswer)
    }
    const decrementSlide = () => {
        if (cardNum !== 0) {
            setColor(colors[singleDecksCards[cardNum - 1].mastery]);
            setCardNum(cardNum - 1)
            setIsAnswer(false)
        }
    }
    const incrementSlide = () => {
        if (cardNum !== singleDecksCards.length) {
            setColor(colors[singleDecksCards[cardNum + 1].mastery])
            setCardNum(cardNum + 1)
            setIsAnswer(false)
        }
    }

    //choose mastery after studying card
    const submitMastery = (e, mastery, card) => {
        e.preventDefault();
        const payload = {
            id: card.id,
            deckId: deckId,
            question: card.question,
            answer: card.answer,
            mastery,
        };
        setColor(colors[mastery]);
        dispatch(updateCardThunk(payload));
        setIsAnswer(false);
    };

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
                    <div className='browse-deck-card-header' style={{ backgroundColor: color }}>
                        Card {cardNum + 1} of {singleDecksCards.length}
                    </div>
                    <div className={`browse-deck-card-content card-question ${letterClassName}`}>
                        {!isAnswer ? singleDecksCards[cardNum].question : singleDecksCards[cardNum].answer}
                    </div>
                    <div className='browse-deck-next-button-container'>
                        {!isAnswer ? <button className='browse-deck-next-button'
                            type="button"
                            style={{ backgroundColor: color }}
                            onClick={nextSide}>Reveal Answer</button> : (
                            <div className="mastery-buttons-container">
                                <div className="mastery-buttons-header">
                                    How well did you know this?
                                </div>
                                <div className="mastery-buttons-buttons-container">
                                    <div >
                                        <button
                                            onClick={(e) => submitMastery(e, 1, singleDecksCards[cardNum])}
                                            className="mastery-button"
                                            style={{ backgroundColor: "#AA0080" }}
                                        >
                                            1
                                        </button>
                                        <div className="mastery-button-confidence">Not at all</div>
                                    </div>
                                    <button
                                        onClick={(e) => submitMastery(e, 2, singleDecksCards[cardNum])}
                                        className="mastery-button"
                                        style={{ backgroundColor: "#FF8A47" }}
                                    >
                                        2
                                    </button>
                                    <button
                                        onClick={(e) => submitMastery(e, 3, singleDecksCards[cardNum])}
                                        className="mastery-button"
                                        style={{ backgroundColor: "#FFDD00" }}
                                    >
                                        3
                                    </button>
                                    <button
                                        onClick={(e) => submitMastery(e, 4, singleDecksCards[cardNum])}
                                        className="mastery-button"
                                        style={{ backgroundColor: "#7FAE2E" }}
                                    >
                                        4
                                    </button>
                                    <div>
                                        <button
                                            onClick={(e) => submitMastery(e, 5, singleDecksCards[cardNum])}
                                            className="mastery-button"
                                            style={{ backgroundColor: "#00A8D7" }}
                                        >
                                            5
                                        </button>
                                        <div className="mastery-button-confidence">Perfectly</div>
                                    </div>
                                </div>
                            </div>
                        )}
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
