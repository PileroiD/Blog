import { generateDate } from "../utils/generate-date";

export const addUser = (login, password) => {
    return fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
            login,
            password,
            registered_at: generateDate(),
            role_id: 2,
        }),
    }).then((data) => data.json());
};
