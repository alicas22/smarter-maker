import React, { useState, useContext } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { cleanUpClassesAction } from "../../store/class";
import "./LoginForm.css";
import { ThemeContext, themes } from '../../context/ThemeContext';

function LoginFormModal() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();



  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(cleanUpClassesAction())
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push('/dashboard')
    }
  };

  const demoEmail = 'demo@aa.io'
  const demoPassword = 'password'
  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push('/dashboard')
    }
  };

  return (
    <>
      <form className="login-modal-form" onSubmit={handleSubmit}>
        <h1 className={`login-modal-header  ${theme === themes.dark ? 'dark' : 'light'}`}>Log In</h1>
        {/* <ul className="validation-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <label>
          Email
          <input
            className={`login-modal-input  ${theme === themes.dark ? 'dark' : 'light'}`}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='validation-errors'>
            {errors.filter((error) => error.includes('email')).length > 0 ? errors.filter((error) => error.includes('email'))[0].split(': ')[1] : ''}
          </div>
        </label>
        <label>
          Password
          <input
            className={`login-modal-input  ${theme === themes.dark ? 'dark' : 'light'}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='validation-errors'>
            {errors.filter((error) => error.includes('password')).length > 0 ? errors.filter((error) => error.includes('password'))[0].split(': ')[1] : ''}
          </div>
        </label>
        <button className={`login-modal-button  ${theme === themes.dark ? 'dark' : 'light'}`} type="submit">Log In</button>
        <div className={`login-modal-button  ${theme === themes.dark ? 'dark' : 'light'}`} onClick={handleDemoLogin}>
          Demo-Sign In
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
