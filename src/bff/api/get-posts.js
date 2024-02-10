import { transformPost } from "../transformers";

export const getPosts = async () =>
    fetch(`http://localhost:3000/posts`)
        .then((data) => data.json())
        .then((loadedPosts) => loadedPosts && loadedPosts.map(transformPost))
        .catch((error) => ({ error }));
