const LOAD_CLASSES = "classes/LOAD_CLASSES";
const CREATE_CLASS = "classes/CREATE_CLASS";
const UPDATE_CLASS = "classes/UPDATE_CLASS";
const DELETE_CLASS = "classes/DELETE_CLASS";
const CLEAN_UP_CLASSES = "classes/CLEANUP"

const loadClassesAction = (classes) => ({
  type: LOAD_CLASSES,
  classes
});



const createClassAction = (newClass) => ({
  type: CREATE_CLASS,
  newClass
});


const updateClassAction = (updatedClass) => ({
  type: UPDATE_CLASS,
  updatedClass
});

const deleteClassAction = (classId) => ({
  type: DELETE_CLASS,
  classId
});

export const cleanUpClassesAction = () => {
  return {
    type: CLEAN_UP_CLASSES
  }
};

export const loadAllClassesThunk = () => async (dispatch) => {
  const response = await fetch("/api/classes/user");
  if (response.ok) {
    const classes = await response.json();
    dispatch(loadClassesAction(classes));
  }
};



export const createClassThunk = (payload) => async (dispatch) => {
  const response = await fetch("/api/classes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newClass = await response.json();
    dispatch(createClassAction(newClass));
    return newClass;

  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};

export const updateClassThunk = (payload) => async (dispatch) => {
  console.log('updateClassThunk')
  const response = await fetch(`/api/classes/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedClass = await response.json();
    dispatch(updateClassAction(updatedClass));
    return updatedClass;

  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};

export const deleteClassThunk = (classId) => async (dispatch) => {
  const response = await fetch(`/api/classes/${classId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteClassAction(classId));

  } else if (response.status < 500) {
    const data = await response.json();
    return data;
  }
  return response;
};

const normalize = (arr) => {
  const resObj = {}
  arr.forEach((ele) => { resObj[ele.id] = ele })
  return resObj
}



const initialState = {};

const classReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOAD_CLASSES: {
      const newState = { ...state }
      newState.allClasses = normalize(action.classes)
      return newState;
    }
    case CREATE_CLASS: {
      const newState = { ...state }
      newState.allClasses = { ...newState.allClasses, [action.newClass.id]: action.newClass }
      // newState.singleClass = { ...newState.singleClass, ...action.newClass }
      return newState
    }
    case UPDATE_CLASS: {
      const newState = { ...state }
      newState.allClasses = { ...newState.allClasses, [action.updatedClass.id]: action.updatedClass }
      // newState.singleClass = { ...newState.singleClass, ...action.updatedClass }
      return newState
    }
    case DELETE_CLASS: {
      const newState = { allClasses: { ...state.allClasses } }
      delete newState.allClasses[action.classId]
      return newState;
    }
    case CLEAN_UP_CLASSES: {
      const newState = { ...initialState };
      return newState;
    }
    default:
      return state;
  }
}

export default classReducer
