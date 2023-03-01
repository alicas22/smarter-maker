import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCardThunk } from "../../store/card";
import { deleteClassThunk } from "../../store/class";
import { deleteDeckThunk } from "../../store/deck";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import './DeleteModal.css'

function DeleteModal({ itemType, itemId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        setErrors([]);

        switch (itemType) {
            case "card":
                dispatch(deleteCardThunk(itemId)).then(() => {
                    closeModal();

                });
                break;
            case "class":
                dispatch(deleteClassThunk(itemId)).then(() => {
                    closeModal();
                    history.push('/dashboard')
                });
                break;
            case "deck":
                dispatch(deleteDeckThunk(itemId)).then(() => {
                    closeModal();

                });
                break;
            default:
                break;
        }

    }
    return (
        <div className="delete-modal-container ">
            <h2 className="delete-modal-header">Are you sure you want to delete this {itemType}?</h2>
            <h4 className="delete-modal-subheader">This cannot be undone</h4>
            <form onSubmit={handleDelete} className='delete-modal-form'>
                <ul className="validation-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <button type="submit" className="delete-modal-form-button">Permanently Delete {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</button>
            </form>
        </div>
    );
}

export default DeleteModal
