import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../icon-component/icon-component";

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Button = styled.button`
    font-size: 18px;
    background-color: #fff;
    border: 1px solid #000;
    padding: 3px;
    border-radius: 7px;
    cursor: pointer;
    &:hover {
        transform: translateY(-3px);
        box-shadow: 4px 3px 4px 0px rgba(0, 0, 0, 0.5);
    }
    transition: all 0.2s;
`;

const StyledIcon = styled(Icon)`
    &:hover {
        transform: translateY(-3px);
    }
    transition: all 0.2s;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            <RightAligned>
                <Link to="/login">
                    <Button>Log in</Button>
                </Link>
            </RightAligned>
            <RightAligned>
                <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
                    <StyledIcon id={"fa-backward"} margin={"10px 0 0 0"} />
                </div>
                <Link to="/post">
                    <StyledIcon
                        id={"fa-file-text-o"}
                        margin={"10px 0 0 10px"}
                    />
                </Link>
                <Link to="/users">
                    <StyledIcon id={"fa-users"} margin={"10px 0 0 10px"} />
                </Link>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
