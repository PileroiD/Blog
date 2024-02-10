import { deleteComment, deletePost, getComments } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const removePost = async (hash, postId) => {
    const accessRoles = [ROLE.ADMIN];

    const access = await sessions.access(hash, accessRoles);
    if (!access) {
        return {
            error: "Access is denied",
            response: null,
        };
    }

    await deletePost(postId);
    const comments = await getComments(postId);

    await Promise.all(comments.map((comment) => deleteComment(comment.id)));

    return {
        error: null,
        response: true,
    };
};
