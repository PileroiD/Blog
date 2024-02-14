import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Error } from "../error/Error";
import { selectUserRole } from "../../selectors";
import { ERROR } from "../../constants/error";
import { checkAccess } from "../utils/check-access";
import { PROP_TYPE } from "../../constants/prop-type";

export const PrivateContent = ({ children, access, serverError = null }) => {
    const userRole = useSelector(selectUserRole);

    const accessError = checkAccess(access, userRole)
        ? null
        : ERROR.ACCESS_DENIED;
    const error = serverError || accessError;

    return <>{error ? <Error error={error} /> : children}</>;
};

PrivateContent.propTypes = {
    children: PropTypes.node.isRequired,
    access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID),
    serverError: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.exact(null),
        PropTypes.bool,
    ]),
};
