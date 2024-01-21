import React from "react";
import ReactDOM from "react-dom/client";
import Blog from "./Blog";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Blog />
    </BrowserRouter>
);
