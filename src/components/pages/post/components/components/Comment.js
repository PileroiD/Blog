import styled from "styled-components";
import { Icon } from "../../../../icon-component/icon-component";

const CommentContainer = ({
    className,
    id,
    content,
    publishedAt,
    authorLogin,
    onCommentRemove,
}) => {
    return (
        <div className={className}>
            <div className="comment-wrapper">
                <div className="comment-header">
                    <div className="author">
                        <Icon id={"fa-user-circle-o"} size={"18px"} />
                        <div className="author-name">{authorLogin}</div>
                    </div>
                    <div className="date">
                        <Icon id={"fa-calendar-o"} size={"18px"} />
                        <div className="published-date">{publishedAt}</div>
                    </div>
                </div>
                <div className="comment-text">{content}</div>
            </div>
            <Icon
                id={"fa-trash-o"}
                size={"21px"}
                styledicon="true"
                onClick={onCommentRemove}
            />
        </div>
    );
};

export const Comment = styled(CommentContainer)`
    display: flex;
    column-gap: 7px;
    margin-top: 10px;

    & .comment-wrapper {
        border: 1px solid #000;
        border-radius: 5px;
        width: 100%;
        padding: 5px 10px;

        & .comment-header {
            display: flex;
            justify-content: space-between;

            & .author {
                display: flex;
                align-items: center;
                height: 20px;
                column-gap: 5px;

                & .author-name {
                    font-size: 15px;
                }

                & i {
                    transform: translateY(-1px);
                }
            }

            & .date {
                display: flex;
                column-gap: 5px;

                & .published-date {
                    font-size: 15px;
                }

                & i {
                    transform: translateY(-3px);
                }
            }
        }

        & .comment-text {
            text-align: start;
            margin-top: 10px;
            font-size: 15px;
            line-height: 15px;
        }
    }
`;
