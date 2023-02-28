import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { updateDeckThunk } from "../../store/deck"
import { useModal } from "../../context/Modal"
import './UpdateDeckModal.css'


const UpdateDeckModal = ({deck}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();
    const [name, setName] = useState(deck.name)
    const [errors, setErrors] = useState([])
    const [createdDeck, setCreatedDeck] = useState()

    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            classId: deck.classId,
            deckId: deck.id,
            name
        }

        if (!user) return null
        const data = await dispatch(updateDeckThunk(payload))

        if (data.errors) {
            setErrors(data.errors);
        } else {
            await setCreatedDeck(data)
            closeModal();
        }
    }

    // useEffect(() => {
    //     if (createdProduct) {
    //         history.push(`/products/${createdProduct.id}`)
    //     }
    // }, [createdProduct])

    return (
        <div className="update-deck-container">
            <h1 className="update-deck-header">Update Deck</h1>
            <form className='update-deck-form' onSubmit={handleSubmit}>
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
                    />
                </label>
                <button className="update-deck-submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default UpdateDeckModal
