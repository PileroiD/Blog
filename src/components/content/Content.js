import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 500;
`;

export const Content = ({ children, error }) => {
    return (
        <>
            {error ? (
                <Div>
                    <h2>Error</h2>
                    <div>{error}</div>
                </Div>
            ) : (
                children
            )}
        </>
    );
};
