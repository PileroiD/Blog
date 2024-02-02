import { useEffect } from "react";
import { useStore } from "react-redux";

export const useResetForm = (reset) => {
    const store = useStore();

    useEffect(() => {
        let currentWasLogOut = store.getState().app.wasLogOut;

        const unsubscribe = store.subscribe(() => {
            let prevWasLogOut = currentWasLogOut;
            currentWasLogOut = store.getState().app.wasLogOut;

            if (currentWasLogOut !== prevWasLogOut) {
                reset();
            }
        });

        return unsubscribe;
    }, [reset, store]);
};
