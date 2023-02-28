import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/dashboard')
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<form className="signup-modal-form" onSubmit={handleSubmit}>
				<h1 className='signup-modal-header'>Sign Up</h1>
				<ul className="validation-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="modal-label">
					First Name
					<input
						className="login-modal-input"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label className="modal-label">
					Last Name
					<input
						className="login-modal-input"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
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
					Username
					<input
						className="login-modal-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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
				<label>
					Confirm Password
					<input
						className="login-modal-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className="login-modal-button " type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
