import PropTypes from "prop-types";
import styled from "styled-components";

const IconContainer = ({ className, id, ...props }) => (
    <div className={className} {...props}>
        <i className={`fa ${id}`} aria-hidden="true"></i>
    </div>
);

const stylesForStyledIcon = `
    &:hover {
        transform: translateY(-3px);
    }
    transition: all 0.2s;
    cursor: pointer;
`;

export const Icon = styled(IconContainer)`
    font-size: ${({ size = "24px" }) => size};
    margin: ${({ margin = "0" }) => margin};
    color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};
    height: ${({ height = "20px" }) => height};
    ${({ styledicon = false }) => (styledicon ? stylesForStyledIcon : "")}
`;

Icon.propTypes = {
    id: PropTypes.string.isRequired,
};
