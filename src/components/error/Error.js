import styled from "styled-components";
import { PROP_TYPE } from "../../constants/prop-type";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30%;
    font-size: 20px;
    font-weight: 500;
`;

export const Error = ({ error }) => {
    return (
        error && (
            <Div>
                <h2>Error</h2>
                <div>{error}</div>
            </Div>
        )
    );
};

Error.propTypes = {
    error: PROP_TYPE.ERROR,
};
