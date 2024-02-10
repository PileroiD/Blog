import { deleteComment, getPost } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";
import { getCommentsWithAuthorLogin } from "./utils/get-comments-with-author-login";

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
    const comments = await getCommentsWithAuthorLogin(postId);

    return {
        error: null,
        response: {
            ...post,
            comments,
        },
    };
};
