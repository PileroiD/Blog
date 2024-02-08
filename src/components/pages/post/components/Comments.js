import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../icon-component/icon-component";
import { Comment } from "./components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../../selectors";
import {
    addCommentAsync,
    closeModal,
    openModal,
    removeCommentAsync,
} from "../../../../actions";
import { useServerRequest } from "../../../../hooks/use-server-request";

const CommentsContainer = ({ className, comments, postId }) => {
    const [newComment, setNewComment] = useState("");
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const requestServer = useServerRequest();

    const onNewCommentAdd = (userId, postId, content) => {
        dispatch(addCommentAsync(userId, postId, content, requestServer));
        setNewComment("");
    };

    const onCommentRemove = (commentId, postId) => {
        dispatch(
            openModal({
                text: "Delete comment?",
                onConfirm: () => {
                    dispatch(
                        removeCommentAsync(commentId, postId, requestServer)
                    );
                    dispatch(closeModal);
                },
                onCancel: () => dispatch(closeModal),
            })
        );
    };

    return (
        <div className={className}>
            <div className="new-comment">
                <textarea
                    name="newComment"
                    value={newComment}
                    placeholder="Your comment..."
                    onChange={({ target }) => setNewComment(target.value)}
                ></textarea>
                <Icon
                    id={"fa-paper-plane-o"}
                    styledicon="true"
                    size={"18px"}
                    onClick={() => onNewCommentAdd(userId, postId, newComment)}
                />
            </div>

            <div className="comments">
                {comments.map(({ id, ...commentData }) => (
                    <Comment
                        key={id}
                        id={id}
                        {...commentData}
                        onCommentRemove={() => onCommentRemove(id, postId)}
                    />
                ))}
            </div>
        </div>
    );
};

export const Comments = styled(CommentsContainer)`
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    width: 560px;

    & .new-comment {
        display: flex;
        column-gap: 7px;

        & i {
            height: 25px;
        }
    }

    & textarea {
        height: 100px;
        width: 100%;
        resize: none;
        padding: 7px;
        border: 1px solid #000;
    }

    & .comments {
        width: 100%;
    }
`;
