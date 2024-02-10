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
import { RESET_POST_DATA, logOut } from "../../actions";

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const UserWrapper = styled.div`
    display: flex;
    font-size: 22px;
    column-gap: 10px;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);
    const session = useSelector(selectUserSession);

    const onLogout = () => {
        dispatch(logOut(session));
        sessionStorage.removeItem("userData");
    };

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
                        <Icon
                            id={"fa-sign-out"}
                            styledicon="true"
                            onClick={onLogout}
                        />
                    </UserWrapper>
                )}
            </RightAligned>
            <RightAligned>
                <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
                    <Icon
                        id={"fa-backward"}
                        styledicon="true"
                        margin={"10px 0 0 0"}
                    />
                </div>
                <Link to="/post">
                    <Icon
                        id={"fa-file-text-o"}
                        margin={"10px 0 0 10px"}
                        styledicon="true"
                    />
                </Link>
                <Link to="/users">
                    <Icon
                        id={"fa-users"}
                        margin={"10px 0 0 10px"}
                        styledicon="true"
                    />
                </Link>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
