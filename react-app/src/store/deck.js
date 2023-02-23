const LOAD_DECKS = "decks/LOAD_DECKS";
const LOAD_SINGLE_DECK = "decks/LOAD_SINGLE_DECK";
const CREATE_DECK = "decks/CREATE_DECK";
const UPDATE_DECK = "decks/UPDATE_DECK";
const DELETE_DECK = "decks/DELETE_DECK";


const loadDecksAction = (decks) => ({
  type: LOAD_DECKS,
  decks
});

const loadSingleDeckAction = (deck) => ({
  type: LOAD_SINGLE_DECK,
  deck
});

const createDeckAction = (newDeck) => ({
  type: CREATE_DECK,
  newDeck
});

const updateDeckAction = (updatedDeck) => ({
  type: UPDATE_DECK,
  updatedDeck
});

const deleteDeckAction = (id) => ({
  type: DELETE_DECK,
  id
});


export const loadAllDecksThunk = () => async (dispatch) => {
  const response = await fetch("/api/decks/");
  if (response.ok) {
    const decks = await response.json();
    dispatch(loadDecksAction(decks));
  }
};

export const loadSingleClassThunk = (deckId) => async (dispatch) => {
  const response = await fetch(`/api/classes/${deckId}`);
  if (response.ok) {
    const deck = await response.json();
    dispatch(loadSingleDeckAction(deck));
  }
};

export const createDeckThunk = (payload) => async (dispatch) => {
  const response = await fetch("/api/decks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newDeck = await response.json();
    dispatch(createDeckAction(newDeck));
    return newDeck;

  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};

export const updateDeckThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/decks/${payload.deckId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newDeck = await response.json();
    dispatch(updateDeckAction(newDeck));
    return newDeck;
  }  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }

};

export const deleteDeckThunk = (deckId) => async (dispatch) => {
  const response = await fetch(`/api/decks/${deckId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteDeckAction(deckId));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};

const normalize = (arr) => {
  const resObj = {}
  arr.forEach((ele) => { resObj[ele.id] = ele })
  return resObj
}

const initialState = {};

const decksReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOAD_DECKS: {
      const newState = { ...state }
      newState.allDecks = normalize(action.decks)
      return newState;
    }
    case LOAD_SINGLE_DECK: {
      const newState = { ...state }
      newState.singleDeck = action.deck
      return newState
    }
    case CREATE_DECK: {
      const newState = { ...state }

      newState.allDecks = { ...newState.allDecks, [action.newDeck.id]: action.newDeck };
      // newState.singleDeck={...newState.singleDeck, ...action.newDeck}
      return newState
    }
    case UPDATE_DECK: {
      const newState = {...state}
      newState.allDecks = { ...newState.allDecks, [action.updatedDeck.id]: action.updatedDeck };
      // newState.singleDeck={...newState.singleDeck, ...action.newDeck}
      return newState
    }
    case DELETE_DECK: {
      console.log('state before newState', state)
      const newState = { ...state };
      console.log('newState initialized', newState)
      console.log('action.id from delete case', action.id)
      delete newState.allDecks[action.id];
      console.log('newState after delete', newState)
      return newState;
    }
    default:
      return state;
  }
}
export default decksReducer;
