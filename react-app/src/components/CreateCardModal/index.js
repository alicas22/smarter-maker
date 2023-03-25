import {  useState, useContext  } from "react"
import { useDispatch, useSelector } from "react-redux"
import {createCardThunk} from '../../store/card'
import { useModal } from "../../context/Modal"
import './CreateCardModal.css'
import { ThemeContext, themes } from '../../context/ThemeContext';


const CreateCardModal = ({deckId}) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [errors, setErrors] = useState([])
    const [createdCard, setCreatedCard] = useState()

    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            deckId,
            question,
            answer,
            mastery: 0
        }
        if (!user) return null

        const data = await dispatch(createCardThunk(payload))

        if (data.errors) {
            setErrors(data.errors);
        } else {
            // await setCreatedCard(data)
            closeModal();
        }
    }


    return (
        <div className={`create-card-container ${theme === themes.dark ? 'dark' : 'light'}`}>
            <h1 className={`create-card-header ${theme === themes.dark ? 'dark' : 'light'}`}>Create Card</h1>
            <form className='create-card-form' onSubmit={handleSubmit}>
                {/* <ul className="validation-errors">
                    {errors.map((error, idx) => (
					    <li key={idx}>{error}</li>
					))}
                </ul> */}
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
                    />
                                        <div className='validation-errors'>
                        {errors.filter((error) => error.includes('question')).length > 0 ? errors.filter((error) => error.includes('question'))[0].split(': ')[1] : ''}
                    </div>
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
                    />
                                        <div className='validation-errors'>
                        {errors.filter((error) => error.includes('answer')).length > 0 ? errors.filter((error) => error.includes('answer'))[0].split(': ')[1] : ''}
                    </div>
                </label>
                <button
                className={`create-card-submit-button ${theme === themes.dark ? 'dark' : 'light'}`}
                type="submit"
                style = {{cursor:"pointer"}}>Submit</button>
            </form>
        </div>
    )
}
export default CreateCardModal
