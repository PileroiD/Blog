import styled from "styled-components";
import { Logo } from "./Logo";
import { ControlPanel } from "./ControlPanel";

const Discription = styled.div`
    font-size: 15px;
    font-style: italic;
`;

const HeaderContainer = ({ className }) => (
    <header className={className}>
        <Logo />
        <Discription>
            Web-technologies <br />
            Writing code <br />
            Fixing bugs
        </Discription>
        <ControlPanel />
    </header>
);

export const Header = styled(HeaderContainer)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    height: 120px;
    width: 1000px;
    padding: 20px 40px;
    box-shadow: 0px -2px 17px #000;
    background-color: #fff;
    z-index: 1;
`;
