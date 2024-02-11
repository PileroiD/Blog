import { useEffect, useState } from "react";
import styled from "styled-components";
import { useServerRequest } from "../../../hooks/use-server-request";
import { PostCard } from "./PostCard";
import { Pagination } from "./Pagination";
import { PAGINATION_LIMIT } from "../../../bff/constants/pagination-limit";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState(null);

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    const [errorMessage, setErrorMessage] = useState(null);
    const requestServer = useServerRequest();

    useEffect(() => {
        requestServer("fetchPosts", page, PAGINATION_LIMIT).then(
            ({ response: { posts, lastPage } }) => {
                if (posts.error) {
                    setErrorMessage(posts.error);
                    return;
                }
                setErrorMessage(null);

                setPosts(posts);
                setLastPage(Number(lastPage));
            }
        );
    }, [requestServer, page]);

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
            {lastPage > 0 ? (
                <Pagination
                    page={page}
                    lastPage={lastPage}
                    setPage={setPage}
                    setLastPage={setLastPage}
                />
            ) : null}
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
