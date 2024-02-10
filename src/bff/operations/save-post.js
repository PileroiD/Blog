import { addPost, getComments, updatePost } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const savePost = async (hash, imageUrl, title, content, postId) => {
    const accessRoles = [ROLE.ADMIN];

    const access = await sessions.access(hash, accessRoles);
    if (!access) {
        return {
            error: "Access is denied",
            response: null,
        };
    }

    const savedPost = postId
        ? await updatePost(imageUrl, title, content, postId)
        : await addPost(imageUrl, title, content);

    const comments = postId ? await getComments(postId) : [];

    return {
        error: null,
        response: {
            ...savedPost,
            comments,
        },
    };
};
