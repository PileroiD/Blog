export const getLastPage = (links) => {
    const regex = /_page=(\d+)/;

    const parts = links.split(",");
    const lastPart = parts[parts.length - 1].trim();
    const lastPage = regex.exec(lastPart);

    return lastPage ? lastPage[1] : null;
};
