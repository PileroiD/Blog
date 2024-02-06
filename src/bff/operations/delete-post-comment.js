import { deleteComment, getComments, getPost } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const deletePostComment = async (hash, commentId, postId) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

    const access = await sessions.access(hash, accessRoles);
    if (!access) {
        return {
            error: "Access is denied",
            response: null,
        };
    }

    await deleteComment(commentId);

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
