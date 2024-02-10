import { useEffect, useState } from "react";
import styled from "styled-components";
import { useServerRequest } from "../../../hooks/use-server-request";
import { PostCard } from "./PostCard";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const requestServer = useServerRequest();

    useEffect(() => {
        requestServer("fetchPosts").then((posts) => {
            if (posts.error) {
                setErrorMessage(posts.error);
                return;
            }
            setErrorMessage(null);

            setPosts(posts.response);
        });
    }, [requestServer]);

    return (
        <div className={className}>
            <div className="search"></div>
            <div className="post-list">
                {errorMessage ? (
                    <div>Error</div>
                ) : (
                    posts &&
                    posts.map((post) => <PostCard key={post.id} post={post} />)
                )}
            </div>
        </div>
    );
};

export const Main = styled(MainContainer)`
    margin-top: 30px;

    & .post-list {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(3, 280px);
        grid-template-rows: repeat(auto-fill, 220px);
        column-gap: 35px;
        row-gap: 35px;
    }
`;
