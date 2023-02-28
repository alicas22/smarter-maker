import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const history=useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();



  const handleSubmit = async (e) => {
    e.preventDefault();
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
      history.push('/dashboard/1')
		}
	  };

  return (
    <>
      <form className="login-modal-form" onSubmit={handleSubmit}>
        <h1 className='login-modal-header'>Log In</h1>
        <ul className="validation-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            className="login-modal-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className="login-modal-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-modal-button" type="submit">Log In</button>
        <div className="login-modal-button" onClick = {handleDemoLogin}>
			Demo-Sign In
		  </div>
      </form>
    </>
  );
}

export default LoginFormModal;
