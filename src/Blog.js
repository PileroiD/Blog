import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components";
import { Footer } from "./components/footer/Footer";
import { Authorization } from "./components/pages/auth/Auth";
import { Registration } from "./components/pages/registration/Registration";
import { Users } from "./components/pages/users/Users";

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    min-height: 100%;
    background-color: #fff;
    margin: 0 auto;
`;

const Page = styled.div`
    padding: 120px 0;
`;

function Blog() {
    return (
        <AppColumn>
            <Header />

            <Page>
                <Routes>
                    <Route path="/" element={<div>Main Page</div>} />
                    <Route path="/login" element={<Authorization />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/post" element={<div>New Post</div>} />
                    <Route path="/post/:post_id" element={<div>Post</div>} />
                    <Route path="*" element={<div>Error</div>} />
                </Routes>
            </Page>

            <Footer />
        </AppColumn>
    );
}

export default Blog;
