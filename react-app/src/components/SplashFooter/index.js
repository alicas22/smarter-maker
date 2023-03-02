import './SplashFooter.css'

function SplashFooter(){
    return (
           <div className='main-footer-container'>
               <div className="tech-and-about-container">
                   <div className="first-column">
                       <p style = {{textDecoration:"underline", color:"white"}}>Technology:</p>
                       <p><a href = "https://www.javascript.com/"  style={{textDecoration: "none", color:"white"}}>Javascript</a></p>
                       <p><a href = "https://www.python.org/"  style={{textDecoration: "none", color:"white"}}>Python</a></p>
                       <p><a href = "https://reactjs.org/"  style={{textDecoration: "none", color:"white"}}>React</a></p>
                       <p><a href = "https://redux.js.org/"  style={{textDecoration: "none", color:"white"}}>Redux</a></p>
                   </div>
                   <div className="second-column">
                       <p><a href = "https://flask.palletsprojects.com/en/2.2.x/"  style={{textDecoration: "none", color:"white"}}>Flask</a></p>
                       <p><a href = "https://www.sqlalchemy.org/"  style={{textDecoration: "none", color:"white"}}>SqlAlchemy</a></p>
                       <p><a href = "https://www.postgresql.org/"  style={{textDecoration: "none", color:"white"}}>PostgresSQL</a></p>
                       <p><a href = "https://alembic.sqlalchemy.org/en/latest/"  style={{textDecoration: "none", color:"white"}}>Alembic</a></p>
                   </div>
                   <div className="third-column">
                       <p style = {{textDecoration:"underline", color:"white"}}>Developer:</p>
                       <p style={{textDecoration: "none", color:"white"}}>Anthony Licas:</p>
                       <p><a href = "https://github.com/Ruidan-Zhang"  style={{textDecoration: "none", color:"white"}}>LinkedIn</a></p>
                       <p><a href = "https://github.com/sophmain"  style={{textDecoration: "none", color:"white"}}>Github</a></p>
                   </div>
               </div>
               <p style={{color:"white"}}><i class="fa-regular fa-copyright"></i> 2023 Smarter-Making, Inc. </p>
               <p style={{color:"white"}}> Smarter-Maker helps you realize your greatest personal and professional ambitions through strong habits and hyper-efficient studying</p>
               <p style={{color:"white", marginBottom: "30px"}}>Smarter-Making Inc., USA 123 Not Real Blvd SmallTown, USA 12345</p>
           </div>
       )
   }

   export default SplashFooter
