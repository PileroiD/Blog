import { setUserRole } from "../api/set-user-role";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const updateUserRole = async (hash, userId, newUserRoleId) => {
    const accessRoles = [ROLE.ADMIN];

    const access = await sessions.access(hash, accessRoles);
    if (!access) {
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
