export const sanitizeContent = (content) => {
    return content
        .replaceAll("<div>", "\n")
        .replaceAll("<br>", "\n")
        .replaceAll("&nbsp;", "")
        .replaceAll("</div>", "");
};
