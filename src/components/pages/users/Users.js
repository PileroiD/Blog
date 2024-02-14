import { UserRow } from "./components/UserRow";
import { useServerRequest } from "../../../hooks/use-server-request";
import { useEffect, useState } from "react";
import { PrivateContent } from "../../private-content/PrivateContent";
import styled from "styled-components";
import { ROLE } from "../../../bff/constants/role";
import { checkAccess } from "../../utils/check-access";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../selectors";

export const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
    const userRole = useSelector(selectUserRole);

    const requestServer = useServerRequest();

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        }

        Promise.all([
            requestServer("fetchRoles"),
            requestServer("fetchUsers"),
        ]).then(([rolesRes, usersRes]) => {
            if (usersRes.error || rolesRes.error) {
                setErrorMessage(usersRes.error || rolesRes.error);
                return;
            }
            setErrorMessage(null);

            setUsers(usersRes.response);
            setRoles(rolesRes.response);
        });
    }, [shouldUpdateUserList, requestServer, userRole]);

    const onUserRemove = (userId) => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        }

        requestServer("removeUser", userId).then(() => {
            setShouldUpdateUserList(!shouldUpdateUserList);
        });
    };

    return (
        <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
            <div className={className}>
                <>
                    <h2>Users</h2>
                    <div>
                        <div className="table-header">
                            <div className="role-name">Login</div>
                            <div className="role-name">Registration date</div>
                            <div className="role-name">Role</div>
                        </div>
                        {users.map(({ id, ...userData }) => (
                            <UserRow
                                key={id}
                                id={id}
                                {...userData}
                                onUserRemove={() => onUserRemove(id)}
                                roles={roles.filter(
                                    ({ id }) => +id !== ROLE.GUEST
                                )}
                            />
                        ))}
                    </div>
                </>
            </div>
        </PrivateContent>
    );
};

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;

    & .table-header {
        display: flex;
        margin-top: 22px;
        padding-left: 10px;

        & > .role-name {
            width: 180px;
            font-weight: 600;
        }
    }
`;
