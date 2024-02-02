import { getUsers } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const fetchUsers = async (userSession) => {
    const accessRoles = [ROLE.ADMIN];

    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: "Access is denied",
            response: null,
        };
    }

    const users = await getUsers();

    return {
        error: null,
        response: users,
    };
};
