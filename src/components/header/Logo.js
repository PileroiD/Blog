import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../components";

const LargeText = styled.div`
    font-size: 48px;
    font-weight: 600;
    line-height: 65px;
`;

const SmallText = styled.div`
    font-size: 15px;
    font-weight: bold;
`;

const LogoContainer = ({ className }) => (
    <Link className={className} to="/">
        <Icon size={"70px"} margin={"0 10px 0 0"} id={"fa-code"} />
        <div>
            <LargeText>Blog</LargeText>
            <SmallText>Web-development</SmallText>
        </div>
    </Link>
);

export const Logo = styled(LogoContainer)`
    display: flex;
    margin-top: -13px;
    color: #000;
    text-decoration: none;

    & i {
        transform: translateY(-5px);
    }
`;
