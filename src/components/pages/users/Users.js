import { UserRow } from "./UserRow";
import { useServerRequest } from "../../../hooks/use-server-request";
import { useEffect, useState } from "react";
import { Content } from "../../content/Content";
import styled from "styled-components";

const UsersContainer = ({ className }) => {
    const requestServer = useServerRequest();

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        Promise.all([
            requestServer("fetchRoles"),
            requestServer("fetchUsers"),
        ]).then(([rolesRes, usersRes]) => {
            if (usersRes.error || rolesRes.error) {
                setErrorMessage(usersRes.error || rolesRes.error);
                return;
            }

            setUsers(usersRes.response);
            setRoles(rolesRes.response);
        });
    }, [requestServer]);

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
                            <UserRow key={id} {...userData} roles={roles} />
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
