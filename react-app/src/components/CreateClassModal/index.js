import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createClassThunk } from "../../store/class"
import { useModal } from "../../context/Modal"
// import "./CreateProduct.css"


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

    // useEffect(() => {
    //     if (createdProduct) {
    //         history.push(`/products/${createdProduct.id}`)
    //     }
    // }, [createdProduct])

    return (
        <div className="create-product-form">
            <h1>Create Class</h1>
            <form className='product-form' onSubmit={handleSubmit}>
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
                <label>
                    <p>
                    Headline
                    </p>
                    <input
                        id="headline"
                        type="text"
                        name="headline"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                    />
                </label>
                <label>
                    <p>
                    Description
                    </p>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button className="create-product-submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default CreateClassModal
