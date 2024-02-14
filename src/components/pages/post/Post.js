import { useEffect, useLayoutEffect, useState } from "react";
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
import { Error } from "../../error/Error";
import { PrivateContent } from "../../private-content/PrivateContent";
import { ROLE } from "../../../constants/role";

const PostContainer = ({ className }) => {
    const post = useSelector(selectPost);
    const dispatch = useDispatch();
    const params = useParams();
    const isEditing = useMatch("/post/:id/edit");
    const isCreating = useMatch("/post");
    const [error, setError] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const requestServer = useServerRequest();

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA);
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false);
            setError(false);
            return;
        }

        setIsLoading(true);

        dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
            setError(postData.error);
            setIsLoading(false);
        });
    }, [params.id, isEditing, isCreating, dispatch, requestServer]);

    if (isLoading) {
        return null;
    }

    return error ? (
        <Error error={error} />
    ) : (
        <div className={className}>
            {isEditing || isCreating ? (
                <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
                    <PostForm post={post} />
                </PrivateContent>
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
