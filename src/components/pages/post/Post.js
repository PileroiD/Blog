import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PostContent } from "./components/PostContent";
import { Comments } from "./components/Comments";
import { useServerRequest } from "../../../hooks/use-server-request";
import { loadPostAsync } from "../../../actions";
import { selectPost } from "../../../selectors/select-post";

const PostContainer = ({ className }) => {
    const post = useSelector(selectPost);
    const dispatch = useDispatch();
    const params = useParams();
    const requestServer = useServerRequest();

    useEffect(() => {
        dispatch(loadPostAsync(requestServer, params.id));
    }, [params.id]);

    return (
        <div className={className}>
            <PostContent post={post} />
            <Comments comments={post.comments} postId={post.id} />
        </div>
    );
};

export const Post = styled(PostContainer)`
    margin-top: 30px;
    padding: 0 80px;
`;
