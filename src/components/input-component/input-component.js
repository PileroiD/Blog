import { forwardRef } from "react";
import styled from "styled-components";

const InputContainer = forwardRef(({ className, ...props }, ref) => {
    return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
    width: ${({ width = "100%" }) => width};
    height: ${({ height = "34px" }) => height};
    margin: ${({ margin }) => margin};
    padding: 5px;
    border: 1px solid gray;
    border-radius: 6px;
`;
