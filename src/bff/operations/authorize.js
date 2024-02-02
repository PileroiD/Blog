import { sessions } from "../sessions";
import { getUser } from "../api";

export const authorize = async (authLogin, authPassword) => {
    const user = await getUser(authLogin);

    if (!user) {
        return {
            error: "User is not found",
            response: null,
        };
    }

    const { id, login, password, roleId } = user;

    if (authPassword !== password) {
        return {
            error: "Invalid password",
            response: null,
        };
    }

    return {
        error: null,
        response: {
            id,
            login,
            roleId,
            session: sessions.create(user),
        },
    };
};
