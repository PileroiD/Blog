import { getComments, getPosts } from "../api";
import { getCommentsCount } from "./utils/get-comments-count";

export const fetchPosts = async () => {
    const [posts, comments] = await Promise.all([getPosts(), getComments()]);

    if (posts.error || comments.error) {
        return {
            error: true,
            response: null,
        };
    }

    return {
        error: null,
        response: posts.map((post) => ({
            ...post,
            commentsCount: getCommentsCount(comments, post.id),
        })),
    };
};
