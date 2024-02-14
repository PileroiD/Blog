import { getComments, getPosts } from "../api";
import { getCommentsCount } from "./utils/get-comments-count";
import { getLastPage } from "./utils/get-last-page";

export const fetchPosts = async (searchPhrase, page, limit) => {
    const [postsResponse, comments] = await Promise.all([
        getPosts(searchPhrase, page, limit),
        getComments(),
    ]);

    const { posts, links } = postsResponse;

    let lastPage;
    if (links) {
        lastPage = getLastPage(links);
    }

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
