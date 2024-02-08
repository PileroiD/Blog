import { ACTION_TYPE } from "../actions";

const initialAppState = {
    wasLogOut: false,
    modal: {
        isOpen: false,
        text: "",
        onConfirm: () => {},
        onCancel: () => {},
    },
};

export const appReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case ACTION_TYPE.LOG_OUT:
            return {
                ...state,
                wasLogOut: !state.wasLogOut,
            };
        case ACTION_TYPE.OPEN_MODAL:
            return {
                ...state,
                modal: { ...action.payload, isOpen: true },
            };
        case ACTION_TYPE.CLOSE_MODAL:
            return initialAppState;
        default:
            return state;
    }
};
