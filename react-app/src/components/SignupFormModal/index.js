import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";
import { cleanUpClassesAction } from "../../store/class";
import "./SignupForm.css";
import { ThemeContext, themes } from '../../context/ThemeContext';

function SignupFormModal() {
	const { theme } = useContext(ThemeContext);
	const dispatch = useDispatch();
	const history = useHistory()
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	// const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();


		if (password === confirmPassword) {
			await dispatch(cleanUpClassesAction())
			const data = await dispatch(signUp(firstName, lastName, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/dashboard')
			}
		} else {
			setErrors([
				"password: Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<form className="signup-modal-form" onSubmit={handleSubmit}>
				<h1 className={`signup-modal-header ${theme === themes.dark ? 'dark' : 'light'}`}>Sign Up</h1>
				{/* <ul className="validation-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
				<label className="modal-label">
					First Name
					<input
						className={`login-modal-input ${theme === themes.dark ? 'dark' : 'light'}`}
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<div className='validation-errors'>
						{errors.filter((error) => error.includes('first')).length > 0 ? errors.filter((error) => error.includes('first'))[0].split(': ')[1] : ''}
					</div>
				</label>
				<label className="modal-label">
					Last Name
					<input
						className={`login-modal-input ${theme === themes.dark ? 'dark' : 'light'}`}
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<div className='validation-errors'>
						{errors.filter((error) => error.includes('last')).length > 0 ? errors.filter((error) => error.includes('last'))[0].split(': ')[1] : ''}
					</div>
				</label>
				<label>
					Email
					<input
						className={`login-modal-input ${theme === themes.dark ? 'dark' : 'light'}`}
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<div className='validation-errors'>
						{errors.filter((error) => error.includes('email')).length > 0 ? errors.filter((error) => error.includes('email'))[0].split(': ')[1] : ''}
					</div>
				</label>
				{/* <label>
					Username
					<input
						className={`login-modal-input ${theme === themes.dark ? 'dark' : 'light'}`}
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}

					/>
				</label> */}
				<label>
					Password
					<input
						className={`login-modal-input ${theme === themes.dark ? 'dark' : 'light'}`}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className='validation-errors'>
						{errors.filter((error) => error.includes('password')).length > 0 ? errors.filter((error) => error.includes('password'))[0].split(': ')[1] : ''}
					</div>
				</label>
				<label>
					Confirm Password
					<input
						className={`login-modal-input ${theme === themes.dark ? 'dark' : 'light'}`}
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					{/* <div className='validation-errors'>
						{errors.filter((error) => error.includes('password')).length > 0 ? errors.filter((error) => error.includes('password'))[0].split(': ')[1] : ''}
					</div> */}
				</label>
				<button className={`login-modal-button ${theme === themes.dark ? 'dark' : 'light'}`} type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
