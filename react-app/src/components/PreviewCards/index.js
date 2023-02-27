import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import CreateCardModal from '../CreateCardModal';
import UpdateCardModal from '../UpdateCardModal';
import OpenModalButton from "../OpenModalButton";
import { deleteCardThunk } from '../../store/card';
import './PreviewCards.css'

function PreviewCards() {
    const dispatch = useDispatch()
    const { deckId } = useParams();
    const user = useSelector((state) => state.session.user);
    const allDecksObj = useSelector((state) => state.decks.allDecks);
    const allClassesObj = useSelector((state) => state.classes.allClasses);
    const allCardsObj = useSelector((state) => state.cards.allCards)

    if (!allClassesObj || !allDecksObj || !allCardsObj) return null

    // const allDecksArr = Object.values(allDecksObj)
    // const allClassesArr = Object.values(allClassesObj)
    // const singleClass = allClassesArr.find((singleClass) => singleClass.id === +classId)
    // const singleClassDecks = allDecksArr.filter((singleDeck) => singleDeck.classId === +classId)
    const allCardsArr = Object.values(allCardsObj)
    const singleDecksCards = allCardsArr.filter(card => card.deckId === +deckId);

    const deleteButton = (async (e, id) => {
        e.preventDefault()
        console.log('before delete card dispatch')
        await dispatch(deleteCardThunk(id))
        console.log('after delete card dispatch')
    })

    return (
        <div className='preview-cards-container'>
            <div className="create-class-modal" style={{ cursor: "pointer" }}>
                <OpenModalButton
                    buttonText="+"
                    modalComponent={<CreateCardModal deckId={deckId} />}
                    className="nav-bar-create-class-modal"
                />
            </div>
            {singleDecksCards.map((card, i) => (
                <div key={i} className='preview-single-card-container'>
                    <div className='preview-card-question'>
                        {card.question}
                    </div>
                    <div className='preview-card-answer'>
                        {card.answer}
                    </div>
                    <div className='decks-delete-deck-button'
                        onClick={e => deleteButton(e, card.id)}><i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="create-class-modal" style={{ cursor: "pointer" }}>
                        <OpenModalButton
                            buttonText=<i className="fa-solid fa-pencil card-pencil"></i>
                            modalComponent={<UpdateCardModal card={card} />}
                            className="nav-bar-create-class-modal"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PreviewCards
