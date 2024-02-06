import { getCurrentDate } from "../utils/get-current-date";

export const addNewComment = (userId, postId, content) => {
    return fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
            author_id: userId,
            post_id: postId,
            published_at: getCurrentDate(),
            content,
        }),
    });
};
