import styled from "styled-components";
import { SpecialPanel } from "./components/SpecialPanel";
import { Icon } from "../../../icon-component/icon-component";
import { useNavigate } from "react-router-dom";
import { PROP_TYPE } from "../../../../constants/prop-type";

const StyledImg = styled.img`
    width: 280px;
    height: 150px;
    object-fit: cover;
    float: left;
    margin: 7px 20px 5px 0;
    border-radius: 5px;
`;

const H2 = styled.h2`
    font-size: 26px;
    line-height: 26px;
`;

const Content = styled.div`
    text-align: justify;
    white-space: pre-line;
`;

const PostContentContainer = ({
    className,
    post: { title, imageUrl, content, publishedAt, id },
}) => {
    const navigate = useNavigate();

    const toEditPage = () => {
        navigate(`/post/${id}/edit`);
    };

    return (
        <div className={className}>
            <StyledImg src={imageUrl} alt={title} />
            <H2>{title}</H2>
            <SpecialPanel
                publishedAt={publishedAt}
                postId={id}
                editButton={
                    <Icon
                        id={"fa-pencil-square-o"}
                        size={"19px"}
                        styledicon="true"
                        onClick={toEditPage}
                    />
                }
                justifycontent={"space-between"}
            />
            <Content>{content}</Content>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)``;

PostContent.propTypes = {
    post: PROP_TYPE.POST,
};
