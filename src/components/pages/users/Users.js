import { UserRow } from "./components/UserRow";
import { useServerRequest } from "../../../hooks/use-server-request";
import { useEffect, useState } from "react";
import { Content } from "../../content/Content";
import styled from "styled-components";
import { ROLE } from "../../../bff/constants/role";

export const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

    const requestServer = useServerRequest();

    useEffect(() => {
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
    }, [shouldUpdateUserList, requestServer]);

    const onUserRemove = (userId) => {
        requestServer("removeUser", userId).then(() => {
            setShouldUpdateUserList(!shouldUpdateUserList);
        });
    };

    return (
        <div className={className}>
            <Content error={errorMessage}>
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
            </Content>
        </div>
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
