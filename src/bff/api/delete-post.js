export const deletePost = async (postId) => {
    return fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
    });
};
