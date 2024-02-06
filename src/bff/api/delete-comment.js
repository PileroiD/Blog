export const deleteComment = async (commentId) => {
    return fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "DELETE",
    });
};
