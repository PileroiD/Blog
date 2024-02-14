import { getPost } from "../api";
import { getCommentsWithAuthorLogin } from "./utils/get-comments-with-author-login";

export const fetchPost = async (postId) => {
    let post;
    let error;

    try {
        post = await getPost(postId);
    } catch (postError) {
        error = postError;
    }

    if (error) {
        return {
            error,
            response: null,
        };
    }

    const comments = await getCommentsWithAuthorLogin(postId);

    return {
        error: null,
        response: {
            ...post,
            comments,
        },
    };
};
