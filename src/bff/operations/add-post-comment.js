import { addNewComment, getComments, getPost } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const addPostComment = async (hash, userId, postId, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.READER, ROLE.MODERATOR];

    const access = await sessions.access(hash, accessRoles);
    if (!access) {
        return {
            error: "Access is denied",
            response: null,
        };
    }

    await addNewComment(userId, postId, content);

    const post = await getPost(postId);
    const comments = await getComments(postId);

    return {
        error: null,
        response: {
            ...post,
            comments,
        },
    };
};
