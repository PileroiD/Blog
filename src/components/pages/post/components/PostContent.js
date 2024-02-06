import styled from "styled-components";
import { Icon } from "../../../icon-component/icon-component";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../../selectors";
import { ROLE } from "../../../../constants/role";

const StyledImg = styled.img`
    float: left;
    margin: 7px 20px 5px 0;
    border-radius: 5px;
`;

const H2 = styled.h2`
    font-size: 26px;
    line-height: 26px;
`;

const DateDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 105px;
`;

const UpdateDiv = styled.div`
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    text-align: justify;
    white-space: pre-line;
`;

const PostContentContainer = ({
    className,
    post: { id, title, imageUrl, content, publishedAt },
}) => {
    // const roleId = useSelector(selectUserRole);

    return (
        <div className={className}>
            <StyledImg src={imageUrl} alt={title} />
            <H2>{title}</H2>
            <div className="special-panel">
                <DateDiv>
                    <Icon id={"fa-calendar-o"} size={"17px"} />
                    {publishedAt}
                </DateDiv>
                <UpdateDiv>
                    <Icon
                        id={"fa-pencil-square-o"}
                        size={"19px"}
                        styledicon="true"
                    />
                    <Icon
                        id={"fa-trash-o"}
                        size={"19px"}
                        margin={"0 0 3px 7px"}
                        styledicon="true"
                    />
                </UpdateDiv>
            </div>
            <Content>{content}</Content>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    & .special-panel {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
    }

    & i {
        position: relative;
        top: -1px;
    }
`;
