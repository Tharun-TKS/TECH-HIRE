// authReducer.js
const initialState = {
    userRole: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  