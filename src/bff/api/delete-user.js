export const deleteUser = (userId) => {
    return fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
    });
};
