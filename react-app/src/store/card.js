const LOAD_CARDS = "cards/LOAD_CARDS";
const LOAD_SINGLE_CARD = "cards/LOAD_SINGLE_CARD";
const CREATE_CARD = "cards/CREATE_CARD";
const UPDATE_CARD = "cards/UPDATE_CARD";
const DELETE_CARD = "cards/DELETE_CARD";


const loadCardsAction = (cards) => ({
  type: LOAD_CARDS,
  cards
});

const loadSingleCardAction = (card) => ({
  type: LOAD_SINGLE_CARD,
  card
});

const createCardAction= (newCard) => ({
  type: CREATE_CARD,
  newCard
});

const updateCardAction = (updatedCard) => ({
  type: UPDATE_CARD,
  updatedCard
});

const deleteCardAction = (id) => ({
  type: DELETE_CARD,
  id
});


export const loadAllCardsThunk = () => async (dispatch) => {
  const response = await fetch("/api/cards/");
  if (response.ok) {
    const cards = await response.json();
    dispatch(loadCardsAction(cards));
  }
};

export const loadSingleCardThunk = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/classes/${cardId}`);
  if (response.ok) {
    const card = await response.json();
    dispatch(loadSingleCardAction(card));
  }
};


export const createCardThunk = (payload) => async (dispatch) => {

  const response = await fetch("/api/cards/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newCard = await response.json();
    dispatch(createCardAction(newCard));
    return newCard;

  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};

export const updateCardThunk = (payload) => async (dispatch) => {
  
  const response = await fetch(`/api/cards/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newCard = await response.json();
    dispatch(updateCardAction(newCard));
    return newCard;
  }  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }

};

export const deleteCardThunk = (cardId) => async (dispatch) => {
  console.log("beginning of delete card thunk")
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "DELETE",
  });
  console.log('response from delete card thunk', response)
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteCardAction(cardId));
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

const cardsReducer = (state = initialState, action) => {
  console.log('action from cardsreducer', action)
  switch (action.type) {
    case LOAD_CARDS: {
      const newState = { ...state }
      newState.allCards = normalize(action.cards)
      return newState;
    }
    case LOAD_SINGLE_CARD: {
      const newState = { ...state }
      newState.singleCard = action.card
      return newState
    }
    case CREATE_CARD: {
      const newState = { ...state }
      newState.allCards = { ...newState.allCards, [action.newCard.id]: action.newCard };
      // newState.singlecard={...newState.singlecard, ...action.newCard}
      return newState
    }
    case UPDATE_CARD: {
      const newState = {...state}
      newState.allCards = { ...newState.allCards, [action.updatedCard.id]: action.updatedCard };
      // newState.singlecard={...newState.singlecard, ...action.newCard}
      return newState
    }
    case DELETE_CARD: {
      const newState = { allCards : {...state.allCards}}
      delete newState.allCards[action.id];

      return newState;
    }
    default:
      return state;
  }
}
export default cardsReducer;
