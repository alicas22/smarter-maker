import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './About.css'

function About() {
    const { classId } = useParams();
    const allClassesObj = useSelector((state) => state.classes.allClasses);
    if (!allClassesObj) return null
    const userClasses = Object.values(allClassesObj)
    const singleClass = userClasses.find((singleClass) => singleClass.id === +classId)
    return (
        <div className="about-container">
            <div className="about-headline-container">
                <div className="about-headline-header">Headline</div>
                <div className="about-headline-content">
                    {singleClass.headline}
                </div>
            </div>
            <div className="about-description-container">
                <div className="about-description-header">Description</div>
                <div className="about-description-content">
                    {singleClass.description}
                </div>
            </div>
        </div>
    )
}

export default About
