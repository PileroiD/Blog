import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = ({ children, className, width, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

const stylesForAnimatedButton = `
    cursor: pointer;
    &:hover {
        transform: translateY(-1px);
        box-shadow: 4px 3px 4px 0px rgba(0, 0, 0, 0.5);
    }
    transition: all 0.2s;
`;

export const Button = styled(ButtonContainer)`
    width: ${({ width = "100%" }) => width};
    font-size: ${({ size = "18px" }) => size};
    font-weight: ${({ fontweight = "300" }) => fontweight};
    background-color: #fff;
    border: 1px solid #000;
    padding: 3px;
    border-radius: 7px;
    ${({ disabled }) => (disabled ? "" : stylesForAnimatedButton)}
`;

Button.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.string,
};
