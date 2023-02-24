import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadAllClassesThunk } from "../../store/class";
import { deleteClassThunk } from "../../store/class"
import CreateClassModal from '../CreateClassModal'
import UpdateClassModal from '../UpdateClassModal'
import OpenModalButton from "../OpenModalButton";
import CreateDeckModal from "../CreateDeckModal";
import ProfileButton from "./ProfileButton";
import "./Navigation.css"


function Navigation(isLoaded) {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		dispatch(loadAllClassesThunk())
	}, [dispatch])

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => {
			setShowMenu(false);
		};
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const allClassesObj = useSelector((state) => state.classes.allClasses);
	if (!allClassesObj) return null
	const allClassesArr = Object.values(allClassesObj)
	const userClasses = allClassesArr.filter((singleClass) => singleClass.userId === user.id)


	const deleteButton = (async (e, id) => {
		e.preventDefault()
		await dispatch(deleteClassThunk(id))
	})

	let sessionLinks;
	if (user) {
	  sessionLinks = (
		<div>
		  <ProfileButton user={user} />
		</div>
	  );
	}

	return (
		<>
			<div className="nav-bar-container">
				<div className="nav-bar-header-container">
					<i class="fa-solid fa-head-side-virus nav-head-icon"></i>
					<div className="nav-bar-user-container">
						<div className="nav-bar-user-icon">
							<i class="fa-regular fa-face-smile"></i>
						</div>
						<div className="nav-bar-user-name">
							{user.firstName} {user.lastName}
						</div>
					</div>
					{sessionLinks}
					{/* <div className="nav-bar-user-gear">
						<i class="fa-solid fa-gear "></i>
					</div> */}
				</div>
				<div className="nav-bar-my-classes-header">
					<h3 className="my-classes"> My Classes ({userClasses.length})</h3>
					<div className="create-class-modal" style={{ cursor: "pointer" }}>
						<OpenModalButton
							buttonText="+"
							modalComponent={<CreateClassModal />}
							className="nav-bar-create-class-modal"
						/>
					</div>
				</div>

				{/* <div>
					{showMenu && (
						<div className="profile-menu">
						<div className="profile-dropdown">
						<div className="dropdown-item">
						<LogoutButton />
						</div>
						</div>
						</div>
						)}
					</div> */}
				<div className="nav-bar-class-list-container">
					{userClasses.map((singleClass) => (
						<div>
							<h3>{singleClass.name}</h3>
							<button onClick={e => deleteButton(e, singleClass.id)}>Delete Class</button>
							<div className="edit-class-modal" style={{ cursor: "pointer" }}>
								<OpenModalButton
									buttonText="Update Class"
									modalComponent={<UpdateClassModal classId={singleClass.id} />}
								/>
							</div>
							<div className="create-deck-modal" style={{ cursor: "pointer" }}>
								<OpenModalButton
									buttonText="Create Deck"
									modalComponent={<CreateDeckModal classId={singleClass.id} />}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Navigation;
