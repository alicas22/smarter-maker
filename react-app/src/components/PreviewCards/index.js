import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import CreateCardModal from '../CreateCardModal';
import UpdateCardModal from '../UpdateCardModal';
import OpenModalButton from "../OpenModalButton";
import DeleteModal from '../DeleteModal';
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
