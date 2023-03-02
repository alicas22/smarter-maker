import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { updateClassThunk } from "../../store/class"
import { useModal } from "../../context/Modal"
import "./UpdateClassModal.css"


const UpdateClassModal = ({singleClass}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();
    const [name, setName] = useState(singleClass.name)
    const [description, setDescription] = useState(singleClass.description)
    const [headline, setHeadline] = useState(singleClass.headline)
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
            description,
            id: singleClass.id
        }
        if (!user) return null
        const data = await dispatch(updateClassThunk(payload))
        if (data.errors) {
            setErrors(data.errors);
        } else {
            await setCreatedClass(data)
            closeModal();
        }
    }

    // useEffect(() => {
    //     if (createdProduct) {
    //         history.push(`/products/${createdProduct.id}`)
    //     }
    // }, [createdProduct])

    return (
        <div className="update-class-container">
            <h1 className="update-class-header">Update Class</h1>
            <form className='update-class-form' onSubmit={handleSubmit}>
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
                    />
                </label>
                <button
                className="update-class-submit-button"
                type="submit"
                style = {{cursor:"pointer"}}
                >Submit</button>
            </form>
        </div>
    )
}
export default UpdateClassModal
