import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {updateCardThunk} from '../../store/card'
import { useModal } from "../../context/Modal"
// import "./CreateClassModal.css"


const UpdateCardModal = ({card}) => {
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
            mastery: 0,
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
        <div className="create-card-form">
            <h1>Update Card</h1>
            <form className='card-form' onSubmit={handleSubmit}>
                <ul className="validation-errors">
                    {errors.map((error, idx) => (
					    <li key={idx}>{error}</li>
					))}
                </ul>
                <label>
                    <p>
                    Question
                    </p>
                    <input
                        id="question"
                        type="text"
                        name="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </label>
                <label>
                    <p>
                    Answer
                    </p>
                    <input
                        id="answer"
                        type="text"
                        name="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </label>
                <button className="create-card-submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default UpdateCardModal
