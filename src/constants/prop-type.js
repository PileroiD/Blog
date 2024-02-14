import PropTypes from "prop-types";
import { ROLE } from "./role";

export const PROP_TYPE = {
    ROLE_ID: PropTypes.oneOf(Object.values(ROLE)),
    ROLE: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
    ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
    COMMENT: PropTypes.shape({
        authorId: PropTypes.string.isRequired,
        authorLogin: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        postId: PropTypes.string.isRequired,
        publishedAt: PropTypes.string.isRequired,
    }),
    POST: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        publishedAt: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }),
};
