import { getUsers } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const fetchUsers = async (hash) => {
    const accessRoles = [ROLE.ADMIN];

    const access = await sessions.access(hash, accessRoles);
    if (!access) {
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
