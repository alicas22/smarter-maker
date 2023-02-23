import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadAllClassesThunk } from "../../store/class";
import { deleteClassThunk } from "../../store/class"
import CreateClassModal from '../CreateClassModal'
import UpdateClassModal from '../UpdateClassModal'
import OpenModalButton from "../OpenModalButton";
import CreateDeckModal from "../CreateDeckModal";


function Navigation() {
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

	return (
		<>
			<div className="user-info-name">
				{user.firstName} {user.lastName}
			</div>
			<div className="create-class-modal" style={{ cursor: "pointer" }}>
				<OpenModalButton
					buttonText="Create Class"
					modalComponent={<CreateClassModal />}
				/>
			</div>

			<div>
				{showMenu && (
					<div className="profile-menu">
						<div className="profile-dropdown">
							<div className="dropdown-item">
								{/* <LogoutButton /> */}
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="side-bar-classes">
				<span> My Classes</span>
				{/* <ClassList /> */}
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
						<div className="create-deck-modal" style = {{cursor:"pointer"}}>
                                <OpenModalButton
                                    buttonText="Create Deck"
                                    modalComponent={<CreateDeckModal classId={singleClass.id} />}
                                />
                            </div>
					</div>
				))}
			</div>
		</>
	);
}

export default Navigation;
