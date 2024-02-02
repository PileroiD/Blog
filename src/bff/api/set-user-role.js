export const setUserRole = (userId, roleId) => {
    return fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
            role_id: roleId,
        }),
    });
};
