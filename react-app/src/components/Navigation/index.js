import { useSelector, useDispatch } from "react-redux";
import { NavLink, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteClassThunk } from "../../store/class"
import CreateClassModal from '../CreateClassModal'
import UpdateClassModal from '../UpdateClassModal'
import OpenModalButton from "../OpenModalButton";
import ProfileButton from "./ProfileButton";
import "./Navigation.css"


function Navigation(isLoaded) {
	const dispatch = useDispatch()
	const history = useHistory()
	const user = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);

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
	const allClassesObj = useSelector((state) => state.classes.allClasses);
	const allDecksObj = useSelector((state) => state.decks.allDecks);
	const allCardsObj = useSelector((state)=> state.cards.allCards)

	if (!allClassesObj || !allDecksObj || !allCardsObj ) return null

	const userClasses = Object.values(allClassesObj)
	const allDecksArr = Object.values(allDecksObj)
	const allCardsArr = Object.values(allCardsObj)

    const singleUserDecks = allDecksArr.filter(deck => {
        return userClasses.some(singleClass => singleClass.id === deck.classId);
      });
	const singleUserCards = allCardsArr.filter(card => {
		return singleUserDecks.some(deck =>deck.id === card.deckId)
	})

	return (
		<>
			<div className="nav-bar-container">
				<div className="nav-bar-header-container">
					<NavLink to='/'
						style={{ textDecoration: 'none' }}>
						<i className="fa-solid fa-head-side-virus nav-head-icon"></i>
					</NavLink>
					<div className="nav-bar-user-container">
						<div className="nav-bar-user-icon">
							<i className="fa-regular fa-face-smile"></i>
						</div>
						<div className="nav-bar-user-name">
							{user.firstName} {user.lastName}
						</div>
					</div>
					{sessionLinks}
				</div>
				<div className="nav-bar-classes-cards-created">
					<div className="user-decks-created">
						Decks Created <span className="number-decks-created">{singleUserDecks.length}</span>
					</div>
					<div className="user-cards-created">
						Cards Created <span className="number-cards-created">{singleUserCards.length}</span>
					</div>
				</div>
				<div className="nav-bar-my-classes-header">
					<h3 className="my-classes"> My Classes ({userClasses.length})</h3>
					<div className="create-class-modal" style={{ cursor: "pointer" }}>
						<OpenModalButton
							buttonText="+"
							modalComponent={<CreateClassModal userClasses={userClasses} />}
							className="nav-bar-create-class-modal"
						/>
					</div>
				</div>


				<div className="nav-bar-class-list-container">
					{userClasses.map((singleClass, i) => (
						<div key ={i}>
							<div className="nav-bar-class-card-container">
								<NavLink
									to={`/dashboard/${singleClass.id}`}
									exact
									className="class-list-inactive try-this-one"
									activeClassName="class-list-active try-this-one-active"
									isActive={() => {
										// Get the current URL
										const currentUrl = window.location.pathname;

										// Check if the current URL matches the class URL
										const classUrl = `/dashboard/${singleClass.id}`;
										const isActive = currentUrl === classUrl;

										// Return true to activate the link, false otherwise
										return isActive;
									}}
								>
									<i className="fa-solid fa-graduation-cap little-hat"></i>
									<div className="class-name-edit-modal-delete-button">
										<h3>{singleClass.name}</h3>
										<div className="edit-class-modal" style={{ cursor: "pointer" }}>
											<div className="delete-class-edit-modal-only">
												<OpenModalButton
													buttonText=<i className="fa-solid fa-pencil class-pencil"></i>
													modalComponent={<UpdateClassModal singleClass={singleClass} />}
												/>
											</div>
											<div onClick={e => deleteButton(e, singleClass.id)}
												className="class-delete-button">x
											</div>
										</div>
									</div>
								</NavLink>
							</div>
							{/* <div className="edit-class-modal" style={{ cursor: "pointer" }}>
								<OpenModalButton
									buttonText="Update Class"
									modalComponent={<UpdateClassModal singleClass={singleClass} />}
								/>
							</div> */}

						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Navigation;
