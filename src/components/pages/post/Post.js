import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { PostContent } from "./components/PostContent";
import { Comments } from "./components/Comments";
import { useServerRequest } from "../../../hooks/use-server-request";
import { loadPostAsync } from "../../../actions";
import { selectPost } from "../../../selectors/select-post";
import { PostForm } from "./components/PostForm";
import { RESET_POST_DATA } from "../../../actions";
import { initialPostState } from "../../../reducers/post-reducer";

const PostContainer = ({ className }) => {
    const post = useSelector(selectPost);
    const dispatch = useDispatch();
    const params = useParams();
    const isEditing = useMatch("/post/:id/edit");
    const isCreating = useMatch("/post");
    const requestServer = useServerRequest();

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA);
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            return;
        }

        dispatch(loadPostAsync(requestServer, params.id));
    }, [params.id, isEditing, isCreating, dispatch, requestServer]);

    return (
        <div className={className}>
            {isEditing || isCreating ? (
                <PostForm post={isCreating ? initialPostState : post} />
            ) : (
                <>
                    <PostContent post={post} />
                    <Comments comments={post.comments} postId={post.id} />
                </>
            )}
        </div>
    );
};

export const Post = styled(PostContainer)`
    margin-top: 30px;
    padding: 0 80px;
`;
