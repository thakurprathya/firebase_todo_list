export const initialState = {
    // user: "null",
    user: null,
    uid: null,
};
  
export const actionTypes = {
    SET_USER: "SET_USER",
    // SET_SESSION: "SET_SESSION",
};
  
const reducer = (state, action) => {  
    // console.log(action);
    switch (action.type) {
      case actionTypes.SET_USER:  //if dispatched setusers this block will run changing the data layer
        return {
          ...state,  //keeping everything in that state
          user: action.user,  //changing the user to dispatched user
        };
      // case actionTypes.SET_SESSION:
      //   localStorage.setItem("uid", action.uid);
      //   localStorage.setItem("displayName", action.displayName);
      //   localStorage.setItem("photoURL", action.photoURL);
      //   localStorage.setItem("email", action.email);
      //   console.log("session added to storage");
      //   return {
      //       ...state,
      //       uid: action.uid,
      //       displayName: action.displayName,
      //       photoURL: action.photoURL,
      //       email: action.email
      //   };
      default:
        return state;
    }
};
  
export default reducer;