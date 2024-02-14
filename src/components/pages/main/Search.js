import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "../../input-component/input-component";
import { Icon } from "../../icon-component/icon-component";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
    return (
        <div className={className}>
            <Input
                placeholder="Search..."
                value={searchPhrase}
                onChange={onChange}
            />
            <Icon id={"fa fa-search"} height={"31px"} size={"20px"} />
        </div>
    );
};

export const Search = styled(SearchContainer)`
    display: flex;
    width: 400px;
    justify-content: center;
    align-items: center;
    margin: 0 auto 30px auto;

    & > input {
        padding-right: 30px;
    }

    & i {
        position: absolute;
        transform: translate(-27px, 4px);
        color: gray;
    }
`;

Search.propTypes = {
    searchPhrase: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
