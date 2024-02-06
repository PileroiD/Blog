import { getRoles } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const fetchRoles = async (hash) => {
    const accessRoles = [ROLE.ADMIN];

    const access = await sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: "Access is denied",
            response: null,
        };
    }

    const roles = await getRoles();

    return {
        error: null,
        response: roles,
    };
};
