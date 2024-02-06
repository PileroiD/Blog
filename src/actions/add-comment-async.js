import { setPostData } from "./set-post-data";

export const addCommentAsync =
    (userId, postId, content, requestServer) => (dispatch) => {
        requestServer("addPostComment", userId, postId, content).then(
            (commentData) => {
                dispatch(setPostData(commentData.response));
            }
        );
    };
