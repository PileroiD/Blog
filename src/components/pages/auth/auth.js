import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../../bff";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../../input-component/input-component";
import { Button } from "../../button-component/button-component";
import { setUser } from "../../../actions";
import { selectUserRole } from "../../../selectors";
import { ROLE } from "../../../constants/role";

const StyledLink = styled(Link)`
    text-decoration: underline;
    font-size: 15px;
`;

const ErrorMessage = styled.div`
    margin-top: 10px;
    padding: 10px;
    background: #f88a89;
    border: 1px solid black;
`;

const authFormSchema = yup.object().shape({
    login: yup
        .string()
        .required("Login is required")
        .matches(/^\w+$/, "Only letters and numbes are available for login")
        .min(3, "Invalid login. Minimum 3 symbols")
        .max(20, "Invalid login. Max 20 symbols"),
    password: yup
        .string()
        .required("Password is required")
        .matches(
            /^[\w#%]+$/,
            "Only letters, numbes and (#, %) symbols are available for password"
        )
        .min(8, "Invalid password. Minimum 8 symbols")
        .max(30, "Invalid password. Max 30 symbols"),
});

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authFormSchema),
    });

    const [serverError, setServerError] = useState(null);
    const dispatch = useDispatch();
    const store = useStore();
    const roleId = useSelector(selectUserRole);

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
    }, []);

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, response }) => {
            if (error) {
                setServerError(`Request error: ${error}`);
                return;
            }

            dispatch(setUser(response));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/"></Navigate>;
    }

    return (
        <div className={className}>
            <h2>Authorization</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Login"
                    name="login"
                    id="login"
                    {...register("login", {
                        onChange: () => setServerError(null),
                    })}
                />
                {/* {errors.login && <span>{errors.login.message}</span>} */}

                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    {...register("password", {
                        onChange: () => setServerError(null),
                    })}
                />
                {/* {errors.password && <span>{errors.password.message}</span>} */}

                <Button disabled={!!formError} type="submit">
                    Log in
                </Button>

                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

                <StyledLink to="/register">Sign in</StyledLink>
            </form>
        </div>
    );
};

export const Authorization = styled(AuthorizationContainer)`
    text-align: center;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > form {
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        width: 256px;
    }
`;