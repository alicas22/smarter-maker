import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createDeckThunk } from "../../store/deck"
import { useModal } from "../../context/Modal"
import "./CreateDeckModal.css"


const CreateDeckModal = (classId) => {
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
        <div className="create-deck-container">
            <h1 className='create-deck-header'>Create Deck</h1>
            <form className='create-deck-form' onSubmit={handleSubmit}>
                <ul className="validation-errors">
                    {errors.map((error, idx) => (
					    <li key={idx}>{error}</li>
					))}
                </ul>
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
                        required
                    />
                </label>
                <button className="create-deck-submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default CreateDeckModal
