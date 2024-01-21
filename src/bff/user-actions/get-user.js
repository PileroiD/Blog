import { getUsers } from "./get-users";

export const getUser = async (authLogin) => {
    const users = await getUsers();
    return users.find(({ login }) => login === authLogin);
};
