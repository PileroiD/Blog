import styled from "styled-components";

const ButtonContainer = ({ children, className, width, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer)`
    width: ${({ width = "100%" }) => width};
    font-size: 18px;
    background-color: #fff;
    border: 1px solid #000;
    padding: 3px;
    border-radius: 7px;
    cursor: pointer;
    &:hover {
        transform: translateY(-3px);
        box-shadow: 4px 3px 4px 0px rgba(0, 0, 0, 0.5);
    }
    transition: all 0.2s;
`;
