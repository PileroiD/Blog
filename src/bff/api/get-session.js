import { transformSession } from "../transformers";

export const getSession = async (hash) =>
    await fetch(`http://localhost:3000/sessions?hash=${hash}`)
        .then((loadedSession) => loadedSession.json())
        .then(
            ([loadedSession]) =>
                loadedSession && transformSession(loadedSession)
        );
