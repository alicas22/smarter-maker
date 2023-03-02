import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createClassThunk } from "../../store/class"
import { useModal } from "../../context/Modal"
import "./CreateClassModal.css"


const CreateClassModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [headline, setHeadline] = useState('')
    const [errors, setErrors] = useState([])
    const [createdClass, setCreatedClass] = useState()

    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            userId: user.id,
            name,
            headline,
            description
        }
        if (!user) return null

        const data = await dispatch(createClassThunk(payload))
        if (data.errors) {
            setErrors(data.errors);
        } else {
            await setCreatedClass(data)
            closeModal();
        }
    }

    useEffect(() => {
        if (createdClass) {
            history.push(`/dashboard/${createdClass.id}/decks`)
        }
    }, [createdClass])

    return (
        <div className="create-class-container">
            <h1 className="create-class-header">Create New Class</h1>
            <h4 className="create-class-subtitle">A Class is a set of Flashcards, grouped into Decks</h4>
            <form className='class-form' onSubmit={handleSubmit}>
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
                        placeholder="i.e. Biology 101"
                    />
                </label>
                <label>
                    <p>
                    Headline
                    </p>
                    <textarea
                        id="headline"
                        type="text"
                        name="headline"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        required
                        placeholder="i.e. Basics of first my biology class"
                    />
                </label>
                <label>
                    <p>
                    Description
                    </p>
                    <textarea
                        id="description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="i.e. Students will investigate biological concepts including the chemical basis of life, cell structure and function, metabolism, reproduction, genetics, evolution, biological diversity and classification, plant structure and function, animal structure and function and ecology."
                    />
                </label>
                <button
                className="create-class-submit-button"
                type="submit"
                style = {{cursor:"pointer"}}>Submit</button>
            </form>
        </div>
    )
}
export default CreateClassModal
