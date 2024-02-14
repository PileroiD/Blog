import { transformPost } from "../transformers";

export const getPost = async (postId) =>
    fetch(`http://localhost:3000/posts/${postId}`)
        .then((res) => {
            if (res.ok) {
                return res;
            }

            const error =
                res.status === 404
                    ? "Page not found"
                    : "Something went wrong. Try again later";

            return Promise.reject(error);
        })
        .then((data) => data.json())
        .then((loadedPost) => loadedPost && transformPost(loadedPost));
