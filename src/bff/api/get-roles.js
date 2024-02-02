export const getRoles = () =>
    fetch("http://localhost:3000/roles").then((data) => data.json());
