import { server } from "../bff";
import { ACTION_TYPE } from "./action-type";

export const logOut = (session) => {
    server.logout(session);

    return {
        type: ACTION_TYPE.LOG_OUT,
    };
};
