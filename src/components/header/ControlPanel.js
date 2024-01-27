import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Icon } from "../icon-component/icon-component";
import { Button } from "../button-component/button-component";
import { ROLE } from "../../constants/role";
import {
    selectUserRole,
    selectUserLogin,
    selectUserSession,
} from "../../selectors";
import { logOut } from "../../actions";

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StyledIcon = styled(Icon)`
    &:hover {
        transform: translateY(-3px);
    }
    transition: all 0.2s;
    cursor: pointer;
`;

const UserWrapper = styled.div`
    display: flex;
    align-items: center;
    font-size: 22px;
    column-gap: 10px;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);
    const session = useSelector(selectUserSession);

    return (
        <div className={className}>
            <RightAligned>
                {roleId === ROLE.GUEST ? (
                    <Button>
                        <Link to="/login">Log in</Link>
                    </Button>
                ) : (
                    <UserWrapper>
                        <h4>{login}</h4>
                        <StyledIcon
                            id={"fa-sign-out"}
                            onClick={() => dispatch(logOut(session))}
                        />
                    </UserWrapper>
                )}
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
