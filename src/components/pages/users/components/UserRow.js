import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../icon-component/icon-component";
import { useState } from "react";
import { useServerRequest } from "../../../../hooks/use-server-request";
import { PROP_TYPE } from "../../../../constants/prop-type";

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
                        <Icon
                            id={"fa-floppy-o"}
                            size={"20px"}
                            disabled={isSaveButtonDisabled}
                            styledicon="true"
                            height={"29px"}
                            onClick={() => onRoleSave(id, selectedRoleId)}
                        />
                    </div>
                </RoleColumn>
            </UserData>
            <Icon
                id={"fa-trash-o"}
                size={"20px"}
                styledicon="true"
                height={"29px"}
                onClick={onUserRemove}
            />
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

UserRow.propTypes = {
    login: PropTypes.string.isRequired,
    registeredAt: PropTypes.string.isRequired,
    roleId: PROP_TYPE.ROLE_ID.isRequired,
    roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
    id: PropTypes.string.isRequired,
    onUserRemove: PropTypes.func.isRequired,
};
