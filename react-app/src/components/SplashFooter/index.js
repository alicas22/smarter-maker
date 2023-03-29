import './SplashFooter.css'

function SplashFooter() {
    return (
        <div className='main-footer-container'>
            <div className="tech-and-about-container">
                <div className="first-column">
                    <p style={{ textDecoration: "underline", color: "white" }}>Technology:</p>
                    <p><a href="https://www.javascript.com/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank">Javascript</a></p>
                    <p><a href="https://www.python.org/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank">Python</a></p>
                    <p><a href="https://reactjs.org/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank">React</a></p>
                    <p><a href="https://redux.js.org/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank">Redux</a></p>
                </div>
                <div className="second-column">
                    <p><a href="https://flask.palletsprojects.com/en/2.2.x/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank">Flask</a></p>
                    <p><a href="https://www.sqlalchemy.org/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank">SqlAlchemy</a></p>
                    <p><a href="https://www.postgresql.org/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank">PostgresSQL</a></p>
                    <p><a href="https://alembic.sqlalchemy.org/en/latest/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank">Alembic</a></p>
                </div>
                <div className="third-column">
                    <p style={{ textDecoration: "underline", color: "white" }}>Developer:</p>
                    <p style={{ textDecoration: "none", color: "white" }}>Anthony Licas:</p>
                    <p><a href="https://www.linkedin.com/in/anthony-licas-7b675061/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank"
                    >LinkedIn</a></p>
                    <p><a href="https://github.com/alicas22/smarter-maker"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank"
                    >Github</a></p>
                    <p><a href="https://alicas22.github.io/"
                        style={{ textDecoration: "none", color: "white" }}
                        target="_blank"
                    >Portfolio</a></p>
                </div>
            </div>
            <p style={{ color: "white" }}><i class="fa-regular fa-copyright"></i> 2023 Smarter-Making, Inc. </p>
            <p style={{ color: "white" }}> Smarter-Maker helps you realize your greatest personal and professional ambitions through strong habits and hyper-efficient studying</p>
            <p style={{ color: "white", marginBottom: "30px" }}>Smarter-Making Inc., USA 123 Not Real Blvd SmallTown, USA 12345</p>
        </div>
    )
}

export default SplashFooter
