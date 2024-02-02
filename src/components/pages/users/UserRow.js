import styled from "styled-components";
import { Icon } from "../../icon-component/icon-component";
import { useState } from "react";
import { useServerRequest } from "../../../hooks/use-server-request";

const StyledIcon = styled(Icon)`
    &:hover {
        transform: translateY(-3px);
    }
    transition: all 0.2s;
    font-size: 18px;
    line-height: 16px;
    cursor: pointer;
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
    registeredAt,
    roleId: userRoleId,
    roles,
    id,
    onUserRemove,
}) => {
    const [initialRoleId, setInitialRoleId] = useState(userRoleId);
    const [selectedRoleId, setSelecterRoleId] = useState(userRoleId);
    const isSaveButtonDisabled = selectedRoleId === initialRoleId;

    const requestServer = useServerRequest();

    const onRoleChange = ({ target }) => {
        setSelecterRoleId(Number(target.value));
    };

    const onRoleSave = (userId, newUserRoleId) => {
        if (isSaveButtonDisabled) {
            return;
        }

        requestServer("updateUserRole", userId, newUserRoleId).then(() => {
            setInitialRoleId(newUserRoleId);
        });
    };

    return (
        <div className={className}>
            <UserData>
                <UserDataItem>{login}</UserDataItem>
                <UserDataItem>{registeredAt}</UserDataItem>

                <RoleColumn>
                    <select value={selectedRoleId} onChange={onRoleChange}>
                        {roles.map(({ id: roleId, name: roleName }) => (
                            <option key={roleId} value={roleId}>
                                {roleName}
                            </option>
                        ))}
                    </select>
                    <div className="save-role-button">
                        <StyledIcon
                            id={"fa-floppy-o"}
                            disabled={isSaveButtonDisabled}
                            onClick={() => onRoleSave(id, selectedRoleId)}
                        />
                    </div>
                </RoleColumn>
            </UserData>
            <StyledIcon id={"fa-trash-o"} onClick={onUserRemove} />
        </div>
    );
};

export const UserRow = styled(UserRowContainer)`
    display: flex;
    align-items: center;
    margin-top: 10px;
    column-gap: 10px;

    & .save-role-button {
        width: 21px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
