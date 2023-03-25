import { useEffect, useState, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createClassThunk } from "../../store/class"
import { useModal } from "../../context/Modal"
import { ThemeContext, themes } from '../../context/ThemeContext';
import "./CreateClassModal.css"


const CreateClassModal = () => {
    const { theme } = useContext(ThemeContext);
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
        <div className={`create-class-container ${theme === themes.dark ? 'dark' : 'light'}`}>
            <h1 className={`create-class-header ${theme === themes.dark ? 'dark' : 'light'}`}>Create New Class</h1>
            <h4 className={`create-class-subtitle ${theme === themes.dark ? 'dark' : 'light'}`}>A Class is a set of Flashcards, grouped into Decks</h4>
            <form className='class-form' onSubmit={handleSubmit}>
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
                        placeholder="i.e. Biology 101"
                    />
                    <div className='validation-errors'>
                        {errors.filter((error) => error.includes('name')).length > 0 ? errors.filter((error) => error.includes('name'))[0].split(': ')[1] : ''}
                    </div>
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
                        placeholder="i.e. Basics of first my biology class"
                    />
                    <div className='validation-errors'>
                        {errors.filter((error) => error.includes('headline')).length > 0 ? errors.filter((error) => error.includes('headline'))[0].split(': ')[1] : ''}
                    </div>
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
                        placeholder="i.e. Students will investigate biological concepts including the chemical basis of life, cell structure and function, metabolism, reproduction, genetics, evolution, biological diversity and classification, plant structure and function, animal structure and function and ecology."
                    />
                    <div className='validation-errors'>
                        {errors.filter((error) => error.includes('description')).length > 0 ? errors.filter((error) => error.includes('description'))[0].split(': ')[1] : ''}
                    </div>
                </label>
                <button
                    className={`create-class-submit-button ${theme === themes.dark ? 'dark' : 'light'}`}
                    type="submit"
                    style={{ cursor: "pointer" }}>Submit</button>
            </form>
        </div>
    )
}
export default CreateClassModal
