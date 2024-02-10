import { transformComment } from "../transformers";

export const getComments = (postId) => {
    const request =
        postId !== undefined
            ? `http://localhost:3000/comments?post_id=${postId}`
            : "http://localhost:3000/comments";

    return fetch(request)
        .then((loadedComments) => loadedComments.json())
        .then((loadedComments) => loadedComments.map(transformComment))
        .catch((error) => ({ error }));
};
