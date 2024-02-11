import { getComments, getPosts } from "../api";
import { getCommentsCount } from "./utils/get-comments-count";
import { getLastPage } from "./utils/get-last-page";

export const fetchPosts = async (page, limit) => {
    const [postsResponse, comments] = await Promise.all([
        getPosts(page, limit),
        getComments(),
    ]);

    const { posts, links } = postsResponse;

    const lastPage = getLastPage(links);

    if (posts.error || comments.error) {
        return {
            error: true,
            response: null,
        };
    }

    return {
        error: null,
        response: {
            posts: posts.map((post) => ({
                ...post,
                commentsCount: getCommentsCount(comments, post.id),
            })),
            lastPage,
        },
    };
};
