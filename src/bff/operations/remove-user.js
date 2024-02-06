import { deleteUser } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const removeUser = async (hash, userId) => {
    const accessRoles = [ROLE.ADMIN];

    const access = await sessions.access(hash, accessRoles);
    if (!access) {
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
