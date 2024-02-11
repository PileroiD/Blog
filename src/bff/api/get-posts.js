import { transformPost } from "../transformers";

export const getPosts = async (page, limit) => {
    return fetch(`http://localhost:3000/posts?_page=${page}&_limit=${limit}`)
        .then((loadedPosts) =>
            Promise.all([loadedPosts.json(), loadedPosts.headers.get("Link")])
        )
        .then(([loadedPosts, links]) => ({
            posts: loadedPosts && loadedPosts.map(transformPost),
            links,
        }))
        .catch((error) => ({ error }));
};
