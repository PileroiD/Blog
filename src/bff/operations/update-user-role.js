import { setUserRole } from "../api/set-user-role";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
    const accessRoles = [ROLE.ADMIN];

    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: "Access is denied",
            response: null,
        };
    }

    setUserRole(userId, newUserRoleId);

    return {
        error: null,
        response: true,
    };
};
