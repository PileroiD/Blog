import { removeComment } from "./session/remove-comment";
import { ROLE } from "../../constants/role";

export const createSession = (role_id) => {
    const session = {
        logout: () => {
            Object.keys(session).forEach((key) => {
                delete session[key];
            });
        },
    };

    switch (role_id) {
        case ROLE.ADMIN:
            session.removeComment = removeComment;
            break;
        case ROLE.MODERATOR:
            session.removeComment = removeComment;
            break;
        case ROLE.READER:
            break;

        default:
            return;
    }

    return session;
};
