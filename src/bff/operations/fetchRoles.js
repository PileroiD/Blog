import { getRoles } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const fetchRoles = async (userSession) => {
    const accessRoles = [ROLE.ADMIN];

    if (!sessions.access(userSession, accessRoles)) {
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
