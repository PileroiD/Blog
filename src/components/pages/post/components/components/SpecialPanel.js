import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../../icon-component/icon-component";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../../../actions";
import { useServerRequest } from "../../../../../hooks/use-server-request";
import { useNavigate } from "react-router-dom";
import { selectUserRole } from "../../../../../selectors";
import { checkAccess } from "../../../../utils/check-access";
import { ROLE } from "../../../../../constants/role";

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

const SpecialPanelContainer = ({
    className,
    publishedAt,
    editButton,
    postId,
}) => {
    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const navigate = useNavigate();

    const roleId = useSelector(selectUserRole);
    const isAdmin = checkAccess([ROLE.ADMIN], roleId);

    const onPostRemove = (postId) => {
        dispatch(
            openModal({
                text: "Delete post?",
                onConfirm: () => {
                    requestServer("removePost", postId).then(() =>
                        navigate("/")
                    );
                    dispatch(closeModal);
                },
                onCancel: () => dispatch(closeModal),
            })
        );
    };

    return (
        <div className={className}>
            {publishedAt && (
                <DateDiv>
                    <Icon id={"fa-calendar-o"} size={"17px"} />
                    {publishedAt}
                </DateDiv>
            )}
            {isAdmin ? (
                <UpdateDiv>
                    {editButton}
                    {publishedAt && (
                        <Icon
                            id={"fa-trash-o"}
                            size={"19px"}
                            margin={"0 0 3px 7px"}
                            styledicon="true"
                            onClick={() => onPostRemove(postId)}
                        />
                    )}
                </UpdateDiv>
            ) : null}
        </div>
    );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
    margin: 10px 0;
    display: flex;
    justify-content: center;
    column-gap: 395px;

    & i {
        position: relative;
        top: -2px;
    }
`;

SpecialPanel.propTypes = {
    publishedAt: PropTypes.string.isRequired,
    editButton: PropTypes.node.isRequired,
    postId: PropTypes.string.isRequired,
};
