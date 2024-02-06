import { getComments, getPost, getUsers } from "../api";

export const fetchPost = async (postId) => {
    const post = await getPost(postId);
    const allComments = await getComments(postId);
    const users = await getUsers();

    const comments = allComments.map((comment) => {
        const authorLogin = users.find(
            (user) => user.id === comment.authorId
        )?.login;

        return {
            ...comment,
            authorLogin,
        };
    });

    return {
        error: null,
        response: {
            ...post,
            comments,
        },
    };
};
