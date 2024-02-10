import { setPostData } from "./set-post-data";

export const savePostAsync =
    (imageUrl, title, content, requestServer, postId) => (dispatch) =>
        requestServer("savePost", imageUrl, title, content, postId).then(
            (post) => {
                dispatch(setPostData(post.response));
                return post.response.id;
            }
        );
