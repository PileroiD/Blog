const initialAppState = {
    wasLogOut: false,
};

export const appReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case "LOG_OUT":
            return {
                ...state,
                wasLogOut: !state.wasLogOut,
            };
        default:
            return state;
    }
};
