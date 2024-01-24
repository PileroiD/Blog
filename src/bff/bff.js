import { addUser } from "./user-actions/add-user";
import { createSession } from "./user-actions/create-session";
import { getUser } from "./user-actions/get-user";

export const server = {
    authorize: async (authLogin, authPassword) => {
        const user = await getUser(authLogin);

        if (!user) {
            return {
                error: "User is not found",
                response: null,
            };
        }

        if (authPassword !== user.password) {
            return {
                error: "Invalid password",
                response: null,
            };
        }

        return {
            error: null,
            response: createSession(user.role_id),
        };
    },
    register: async (regLogin, regPassword) => {
        const user = await getUser(regLogin);

        if (user) {
            return {
                error: "This login already exists",
                response: null,
            };
        }

        await addUser(regLogin, regPassword);

        return {
            error: null,
            response: createSession(user.role_id),
        };
    },
};