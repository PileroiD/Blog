import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../icon-component/icon-component";

const PostCardContainer = ({
    className,
    post: { id, title, publishedAt, imageUrl, commentsCount },
}) => {
    const sanitizedTitle =
        title.length > 50 ? title.slice(0, 50) + "..." : title;

    return (
        <div className={className}>
            <Link to={`/post/${id}/`}>
                <img src={imageUrl} alt={title} />
            </Link>
            <div className="post-wrapper">
                <div className="title">
                    <Link to={`/post/${id}/`}>{sanitizedTitle}</Link>
                </div>
                <div className="post-info">
                    <div className="post-date">
                        <Icon
                            id={"fa-calendar-o"}
                            size={"18px"}
                            height={"24px"}
                        />
                        <div className="date">{publishedAt}</div>
                    </div>
                    <div className="post-comments">
                        <Icon
                            id={"fa-comment-o"}
                            size={"18px"}
                            height={"24px"}
                        />
                        <div className="date">{commentsCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PostCard = styled(PostCardContainer)`
    display: grid;
    grid-template-columns: 280px;
    grid-template-rows: 140px auto;
    border: 1px solid black;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 4px 3px 4px 0px rgba(0, 0, 0, 0.5);
    }

    & img {
        width: 278px;
        height: 140px;
        object-fit: cover;
        border-bottom: 1px solid black;
    }

    & .post-wrapper {
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        & .title {
            line-height: 15px;
            font-size: 15px;
            font-weight: 600;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    & .post-info {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;

        & .post-date {
            display: flex;
            align-items: center;
            column-gap: 6px;

            & .date {
                font-size: 14px;
            }
        }

        & .post-comments {
            display: flex;
            column-gap: 6px;
            align-items: center;
        }
    }
`;

const postPropTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
});

PostCard.propTypes = {
    post: postPropTypes.isRequired,
};
