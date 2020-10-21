const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGNED":
      return !state;
    default:
      return state;
  }
};

export default loggedReducer;
