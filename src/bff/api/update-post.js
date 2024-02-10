export const updatePost = (imageUrl, title, content, postId) => {
    return fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
            title,
            image_url: imageUrl,
            content,
        }),
    }).then((updatedPost) => updatedPost.json());
};
