import { transformUser } from "../transformers";

export const getUser = async (authLogin) =>
    await fetch(`http://localhost:3000/users?login=${authLogin}`)
        .then((data) => data.json())
        .then(([loadedUser]) => loadedUser && transformUser(loadedUser));
