import { deleteUser } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const removeUser = async (userSession, userId) => {
    const accessRoles = [ROLE.ADMIN];

    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: "Access is denied",
            response: null,
        };
    }

    deleteUser(userId);

    return {
        error: null,
        response: true,
    };
};
