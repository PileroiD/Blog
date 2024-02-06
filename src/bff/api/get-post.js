import { transformPost } from "../transformers";

export const getPost = async (postId) =>
    fetch(`http://localhost:3000/posts/${postId}`)
        .then((data) => data.json())
        .then((loadedPost) => loadedPost && transformPost(loadedPost));
