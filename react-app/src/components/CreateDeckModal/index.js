import { useState, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createDeckThunk } from "../../store/deck"
import { useModal } from "../../context/Modal"
import "./CreateDeckModal.css"
import { ThemeContext, themes } from '../../context/ThemeContext';


const CreateDeckModal = (classId) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])
    const [createdDeck, setCreatedDeck] = useState()

    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            classId: classId.classId,
            name
        }

        if (!user) return null

        const data = await dispatch(createDeckThunk(payload))
        if (data.errors) {
            setErrors(data.errors);
        } else {
            await setCreatedDeck(data)
            closeModal();
        }
    }



    return (
        <div className={`create-deck-container ${theme === themes.dark ? 'dark' : 'light'}`}>
            <h1 className={`create-deck-header ${theme === themes.dark ? 'dark' : 'light'}`}>Create Deck</h1>
            <form className='create-deck-form' onSubmit={handleSubmit}>
                {/* <ul className="validation-errors">
                    {errors.map((error, idx) => (
					    <li key={idx}>{error}</li>
					))}
                </ul> */}
                <label>
                    <p>
                        Name
                    </p>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className='validation-errors'>
                        {errors.filter((error) => error.includes('name')).length > 0 ? errors.filter((error) => error.includes('name'))[0].split(': ')[1] : ''}
                    </div>
                </label>
                <button
                    className={`create-deck-submit-button ${theme === themes.dark ? 'dark' : 'light'}`}
                    type="submit"
                    style={{ cursor: "pointer" }}>Submit</button>
            </form>
        </div>
    )
}
export default CreateDeckModal
