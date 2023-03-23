import { useState, useContext  } from "react"
import { useDispatch, useSelector } from "react-redux"
import {updateCardThunk} from '../../store/card'
import { useModal } from "../../context/Modal"
import './UpdateCard.css'
import { ThemeContext, themes } from '../../context/ThemeContext';

const UpdateCardModal = ({card}) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [question, setQuestion] = useState(card.question)
    const [answer, setAnswer] = useState(card.answer)
    const [errors, setErrors] = useState([])
    const [createdCard, setCreatedCard] = useState()

    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            deckId: card.deckId,
            question,
            answer,
            mastery: card.mastery,
            id: card.id
        }
        if (!user) return null

        const data = await dispatch(updateCardThunk(payload))

        if (data.errors) {
            setErrors(data.errors);
        } else {
            await setCreatedCard(data)
            closeModal();
        }
    }


    return (
        <div className={`update-card-container ${theme === themes.dark ? 'dark' : 'light'}`}>
            <h1 className={`update-card-header ${theme === themes.dark ? 'dark' : 'light'}`}>Update Card</h1>
            <form className='update-card-form' onSubmit={handleSubmit}>
                <ul className="validation-errors">
                    {errors.map((error, idx) => (
					    <li key={idx}>{error}</li>
					))}
                </ul>
                <label>
                    <p>
                    Question
                    </p>
                    <textarea
                        id="question"
                        type="text"
                        name="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required

                    />
                </label>
                <label>
                    <p>
                    Answer
                    </p>
                    <textarea
                        id="answer"
                        type="text"
                        name="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                </label>
                <button
                className={`update-card-submit-button ${theme === themes.dark ? 'dark' : 'light'}`}
                type="submit"
                style = {{cursor:"pointer"}}
                >Submit</button>
            </form>
        </div>
    )
}
export default UpdateCardModal
