import { getCurrentDate } from "../utils/get-current-date";

export const addPost = (imageUrl, title, content) => {
    return fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
            title,
            image_url: imageUrl,
            content,
            published_at: getCurrentDate(),
        }),
    }).then((data) => data.json());
};
