import { getComments, getUsers } from "../../api";

export const getCommentsWithAuthorLogin = async (postId) => {
    const users = await getUsers();
    const allComments = await getComments(postId);

    const comments = allComments
        .map((comment) => {
            const authorLogin = users.find(
                (user) => user.id === comment.authorId
            )?.login;

            return {
                ...comment,
                authorLogin,
            };
        })
        .reverse();

    return comments;
};
