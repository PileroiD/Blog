import { getPost } from "../api";
import { getCommentsWithAuthorLogin } from "./utils/get-comments-with-author-login";

export const fetchPost = async (postId) => {
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
