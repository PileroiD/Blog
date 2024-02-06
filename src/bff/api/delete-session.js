export const deleteSession = async (sessionId) => {
    return fetch(`http://localhost:3000/sessions/${sessionId}`, {
        method: "DELETE",
    });
};
