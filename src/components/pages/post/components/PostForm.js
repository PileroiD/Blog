import styled from "styled-components";
import { Input } from "../../../input-component/input-component";
import { SpecialPanel } from "./components/SpecialPanel";
import { Icon } from "../../../icon-component/icon-component";
import { useRef } from "react";
import { sanitizeContent } from "./utils/sanitize-content";
import { useDispatch } from "react-redux";
import { useServerRequest } from "../../../../hooks/use-server-request";
import { savePostAsync } from "../../../../actions";
import { useNavigate } from "react-router-dom";

const PostFormContainer = ({
    className,
    post: { title, imageUrl, content, publishedAt, id },
}) => {
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const navigate = useNavigate();

    const onSave = () => {
        const newImageUrl = imageRef.current.value;
        const newTitle = titleRef.current.value;
        const newContent = sanitizeContent(contentRef.current.innerHTML);

        dispatch(
            savePostAsync(newImageUrl, newTitle, newContent, requestServer, id)
        ).then(() => {
            navigate(`/post/${id}`);
        });
    };
    return (
        <div className={className}>
            <div className="input-wrapper">
                <div className="label">Image URL:</div>
                <Input
                    ref={imageRef}
                    defaultValue={imageUrl}
                    placeholder="Image URL"
                />
            </div>
            <div className="input-wrapper">
                <div className="label">Title: </div>
                <Input
                    ref={titleRef}
                    defaultValue={title}
                    placeholder="Title..."
                />
            </div>

            <SpecialPanel
                publishedAt={publishedAt}
                postId={id}
                editButton={
                    <Icon
                        id={"fa-floppy-o"}
                        size={"18px"}
                        styledicon="true"
                        onClick={onSave}
                    />
                }
                justifycontent={"flex-end"}
            />
            <div
                ref={contentRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="post-content"
            >
                {content}
            </div>
        </div>
    );
};

export const PostForm = styled(PostFormContainer)`
    & i {
        position: relative;
        top: -1px;
    }

    & .post-content {
        white-space: pre-line;
        border: 1px solid #000;
        border-radius: 10px;
        padding: 20px;
    }

    & .input-wrapper {
        display: flex;
        align-items: center;

        &:nth-child(2) {
            margin-top: 10px;
        }
    }

    & .label {
        width: 100px;
        font-size: 16px;
    }
`;
