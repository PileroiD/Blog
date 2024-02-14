import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "../../button-component/button-component";

const PaginationContainer = ({
    className,
    page,
    lastPage,
    setPage,
    setLastPage,
}) => {
    return (
        <div className={className}>
            <Button
                disabled={page === 1}
                size={"11px"}
                width={"40px"}
                onClick={() => {
                    setPage(1);
                    setLastPage(0);
                }}
            >
                Start
            </Button>
            <Button
                disabled={page === 1}
                size={"12px"}
                width={"40px"}
                onClick={() => {
                    setPage(page - 1);
                    setLastPage(0);
                }}
            >
                Prev
            </Button>
            <div className="current-page">{page}</div>
            <Button
                disabled={page === lastPage}
                size={"12px"}
                width={"40px"}
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                Next
            </Button>
            <Button
                disabled={page === lastPage}
                size={"11px"}
                width={"40px"}
                onClick={() => {
                    setPage(lastPage);
                }}
            >
                End
            </Button>
        </div>
    );
};

export const Pagination = styled(PaginationContainer)`
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    column-gap: 10px;

    & .current-page {
        font-size: 15px;
        font-weight: 700;
        text-decoration: underline;
    }
`;

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    setLastPage: PropTypes.func.isRequired,
};
