import { setPostData } from "./set-post-data";

export const removeCommentAsync =
    (commentId, postId, requestServer) => (dispatch) => {
        requestServer("deletePostComment", commentId, postId).then(
            (commentData) => {
                dispatch(setPostData(commentData.response));
            }
        );
    };
