import { transformUser } from "../transformers";

export const getUsers = () =>
    fetch("http://localhost:3000/users")
        .then((data) => data.json())
        .then((loadedUsers) => loadedUsers.map(transformUser));
