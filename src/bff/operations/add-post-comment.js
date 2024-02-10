import { addNewComment, getPost } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";
import { getCommentsWithAuthorLogin } from "./utils/get-comments-with-author-login";

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
    const comments = await getCommentsWithAuthorLogin(postId);

    return {
        error: null,
        response: {
            ...post,
            comments,
        },
    };
};
