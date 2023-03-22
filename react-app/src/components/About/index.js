import { useSelector, useDispatch } from "react-redux";
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { updateClassThunk } from "../../store/class"
import './About.css'

function About() {
    const { classId } = useParams();
    const dispatch = useDispatch()
    const inputHeadlineRef = useRef(null);
    const inputDescriptionRef = useRef(null);
    const [editHeadlineMode, setEditHeadlineMode] = useState(false);
    const [editDescriptionMode, setEditDescriptionMode] = useState(false);
    const [newHeadline, setNewHeadline] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [headlineErrors, setHeadlineErrors] = useState([])
    const [descriptionErrors, setDescriptionErrors] = useState([])

    //focuses input field when edit mode is toggled
    useEffect(() => {
        if (inputHeadlineRef.current && editHeadlineMode) {
            inputHeadlineRef.current.focus();
            setNewHeadline(singleClass.headline);
        }
    }, [editHeadlineMode]);

    useEffect(() => {
        if (inputDescriptionRef.current && editDescriptionMode) {
            inputDescriptionRef.current.focus();
            setNewDescription(singleClass.description);
        }
    }, [editDescriptionMode]);

    const user = useSelector((state) => state.session.user);
    const allClassesObj = useSelector((state) => state.classes.allClasses);
    if (!allClassesObj) return null
    const userClasses = Object.values(allClassesObj)
    const singleClass = userClasses.find((singleClass) => singleClass.id === +classId)


    const handleHeadlineSave = async (e) => {
        e.preventDefault()
        setHeadlineErrors([])
        const payload = {
            userId: user.id,
            name: singleClass.name,
            headline: newHeadline,
            description: singleClass.description,
            id: singleClass.id
        }
        const data = await dispatch(updateClassThunk(payload))
        if (data.errors) {
            setHeadlineErrors(data.errors);

        } else {
            setEditHeadlineMode(false);
        }
    }

    const handleDescriptionSave = async (e) => {
        e.preventDefault()
        setDescriptionErrors([])
        const payload = {
            userId: user.id,
            name: singleClass.name,
            headline: singleClass.headline,
            description: newDescription,
            id: singleClass.id
        }
        const data = await dispatch(updateClassThunk(payload))
        if (data.errors) {
            setDescriptionErrors(data.errors);
        } else {
            setEditDescriptionMode(false);
        }
    }

    return (
        <div className="about-container-container">
            <div className="about-container">
                <div className="about-headline-container">
                    <div className="about-headline-header">
                        Headline
                        {editHeadlineMode || headlineErrors.length > 0 ? (
                            <>
                                <i className="fa-solid fa-xmark class-about-edit-x"
                                    onClick={() => {
                                        setNewHeadline("");
                                        setHeadlineErrors([]);
                                        setEditHeadlineMode(false)
                                    }}
                                    style={{ cursor: "pointer" }}></i>
                                <button
                                    type="button"
                                    className="class-headline-edit-submit"
                                    onClick={handleHeadlineSave}
                                    style={{textDecoration:'none'}}>
                                    <i className="fa-solid fa-check class-headline-edit-submit"></i>
                                </button>
                            </>

                        ) : (
                            <i className="fa-solid fa-pencil"
                                onClick={() => setEditHeadlineMode(true)} // pass the click handler to the icon
                                style={{ cursor: 'pointer', textIndent:"1rem"  }} />
                        )}
                    </div>

                    <div className="about-headline-content">
                        {editHeadlineMode || headlineErrors.length > 0 ? (
                            <form
                                className="class-name-edit-input"
                                onSubmit={handleHeadlineSave}
                                style={{border:"none", paddingTop:"0"}}
                                >
                                <ul className="edit-in-place-validation-errors"
                                style={{justifyContent:"flex-start"}}>
                                    {headlineErrors.map((error, idx) => (
                                        <li key={idx}>{error}</li>
                                    ))}
                                </ul>
                                <textarea
                                    className="class-name-edit-input"
                                    type="text"
                                    ref={inputHeadlineRef}// assign the reference to the input element
                                    name="newHeadline"
                                    value={newHeadline}
                                    onChange={e => setNewHeadline(e.target.value)}
                                    // placeholder={singleClass.headline}
                                    style={{width:"100%", height:"100%"}}
                                >
                                </textarea>
                            </form>
                        ) : (
                            <>
                                {singleClass.headline}

                            </>
                        )}
                    </div>
                </div>
                <div className="about-description-container">
                    <div className="about-description-header">
                        Description
                        {editDescriptionMode || descriptionErrors.length > 0 ? (
                            <>
                                <i className="fa-solid fa-xmark class-about-edit-x"
                                    onClick={() => {
                                        setNewDescription("");
                                        setDescriptionErrors([]);
                                        setEditDescriptionMode(false)
                                    }}
                                    style={{ cursor: "pointer" }}></i>
                                <button
                                    type="button"
                                    className="class-description-edit-submit"
                                    onClick={handleDescriptionSave}>
                                    <i className="fa-solid fa-check class-description-edit-submit"></i>
                                </button>
                            </>

                        ) : (
                            <i className="fa-solid fa-pencil "
                                onClick={() => setEditDescriptionMode(true)} // pass the click handler to the icon
                                style={{ cursor: 'pointer', textIndent:"1rem" }} />
                        )}
                        </div>
                    <div className="about-description-content">
                    {editDescriptionMode || descriptionErrors.length > 0 ? (
                            <form
                                className="class-name-edit-input"
                                onSubmit={handleDescriptionSave}
                                style={{border:"none"}}
                                >
                                <ul className="edit-in-place-validation-errors"
                                style={{border:"flex-start"}}>
                                    {descriptionErrors.map((error, idx) => (
                                        <li key={idx}>{error}</li>
                                    ))}
                                </ul>
                                <textarea
                                    className="class-name-edit-input"
                                    type="text"
                                    ref={inputDescriptionRef}// assign the reference to the input element
                                    name="newDescription"
                                    value={newDescription}
                                    onChange={e => setNewDescription(e.target.value)}
                                    // placeholder={singleClass.Description}
                                    style={{width:"100%", minHeight:"200px"}}
                                >
                                </textarea>
                            </form>
                        ) : (
                            <>
                                {singleClass.description}

                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
