import { transformPost } from "../transformers";

export const getPosts = async (searchPhrase, page, limit) => {
    return fetch(
        `http://localhost:3000/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`
    )
        .then((loadedPosts) =>
            Promise.all([loadedPosts.json(), loadedPosts.headers.get("Link")])
        )
        .then(([loadedPosts, links]) => {
            return {
                posts: loadedPosts && loadedPosts.map(transformPost),
                links,
            };
        })
        .catch((error) => ({ error }));
};
