import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory  } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Decks from "../Decks";
import './ClassHeader.css'

function ClassHeader({ allClassesObj }) {
    const { classId } = useParams();
    const history=useHistory()
    const user = useSelector((state) => state.session.user);
    const allDecksObj = useSelector((state) => state.decks.allDecks);
    const allCardsObj = useSelector((state) => state.cards.allCards)
    if (!allClassesObj || !allDecksObj || !allCardsObj) return null

    const allDecksArr = Object.values(allDecksObj)
    const allClassesArr = Object.values(allClassesObj)
    const singleClass = allClassesArr.find((singleClass) => singleClass.id === +classId)
    const singleClassDecks = allDecksArr.filter((singleDeck) => singleDeck.classId === +classId)
    const allCardsArr = Object.values(allCardsObj)
    const singleClassesCards = allCardsArr.filter(card => {
        return singleClassDecks.some(deck => deck.id === card.deckId);
    });

    if (!singleClass)  return null



    return (
        <>
            <div className="class-about-container">
                <i className="fa-solid fa-graduation-cap big-hat"></i>
                <div className="class-about-header">
                    <div className="class-about-sub-button-container">
                        <div className="class-about-name-pencil">
                            {singleClass.name}
                            {/* <i className="fa-solid fa-pencil"></i> */}
                        </div>
                        <div className="class-about-subtitle">
                            Creator: {user.firstName} {user.lastName}
                            <span className="unique-cards-created">{singleClassesCards.length === 1 ? (
                                <span>{singleClassesCards.length} unique card</span>
                            ) : (
                                <span>{singleClassesCards.length} unique cards</span>
                            )}</span>
                        </div>
                        {/* <div className="class-about-study button">
                            <NavLink to={`/dashboard/${classId}/decks/`}>Study</NavLink>
                        </div> */}
                    </div>
                </div>

            </div>
            <div className="class-about-nav-bar">
                <NavLink to={`/dashboard/${classId}/about`}
                    className="class-about-nav-bar-link"
                    activeClassName="class-about-nav-bar-link-active"
                    style={{ textDecoration: 'none' }} >
                    About
                </NavLink>
                <NavLink to={`/dashboard/${classId}/decks`}
                    className="class-about-nav-bar-link"
                    activeClassName="class-about-nav-bar-link-active"
                    style={{ textDecoration: 'none' }} >
                    Decks ({singleClassDecks.length})
                </NavLink>
            </div>
        </>

    )
}

export default ClassHeader
