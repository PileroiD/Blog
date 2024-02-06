import { getCurrentDate } from "../utils/get-current-date";

export const addUser = (login, password) => {
    return fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
            login,
            password,
            registered_at: getCurrentDate(),
            role_id: 2,
        }),
    }).then((data) => data.json());
};
