import { ROLE } from "../constants/role";

const initialUserState = {
    id: null,
    login: null,
    roleId: ROLE.GUEST,
    session: null,
};

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                ...action.payload,
            };
        case "LOG_OUT":
            return initialUserState;
        default:
            return state;
    }
};
