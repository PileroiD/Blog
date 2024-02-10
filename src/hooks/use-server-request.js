import { useSelector } from "react-redux";
import { selectUserSession } from "../selectors";
import { server } from "../bff";
import { useCallback } from "react";

export const useServerRequest = () => {
    let session = useSelector(selectUserSession);

    return useCallback(
        (operation, ...params) => {
            const request = ["register", "authorize", "fetchPost"].includes(
                operation
            )
                ? params
                : [session, ...params];

            return server[operation](...request);
        },
        [session]
    );
};
