import styled from "styled-components";
import { Icon } from "../../icon-component/icon-component";
import { useDispatch } from "react-redux";

const StyledIcon = styled(Icon)`
    &:hover {
        transform: translateY(-3px);
    }
    transition: all 0.2s;
    cursor: pointer;
    font-size: 18px;
    line-height: 16px;
`;

const UserData = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 3px;
    height: 35px;
    padding: 0 10px 0 10px;
`;

const UserDataItem = styled.div`
    width: 180px;
`;

const RoleColumn = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    & > select {
        height: 22px;
    }
`;

const UserRowContainer = ({
    className,
    login,
    registered_at,
    roleId: userRoleId,
    roles,
}) => {
    const dispatch = useDispatch();
    const onRoleChange = () => {};

    return (
        <div className={className}>
            <UserData>
                <UserDataItem>{login}</UserDataItem>
                <UserDataItem>{registered_at}</UserDataItem>

                <RoleColumn>
                    <select value={userRoleId} onChange={onRoleChange}>
                        {roles.map(({ id: roleId, name: roleName }) => (
                            <option key={roleId} value={roleId}>
                                {roleName}
                            </option>
                        ))}
                    </select>
                    <StyledIcon
                        id={"fa-floppy-o"}
                        onClick={() => dispatch(/* TODO */)}
                    />
                </RoleColumn>
            </UserData>
            <StyledIcon
                id={"fa-trash-o"}
                onClick={() => dispatch(/* TODO */)}
            />
        </div>
    );
};

export const UserRow = styled(UserRowContainer)`
    display: flex;
    align-items: center;
    margin-top: 10px;
    column-gap: 10px;
`;
