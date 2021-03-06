const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        user: {},
      };

    case "LOGOUT_REQUEST":
      return {
        ...state,
        user: {},
      };

    case "REGISTER_REQUEST":
      return {
        ...state,
        user: {},
      };

    case "PROFILE_REQUEST":
      return {
        ...state,
        user: action.payload,
      };

    default:
      break;
  }
  return state;
};
export default reducer;
