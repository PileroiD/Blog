import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import styled from "styled-components";
import { Input } from "../../input-component/input-component";
import { Button } from "../../button-component/button-component";
import { setUser } from "../../../actions";
import { selectUserRole } from "../../../selectors";
import { ROLE } from "../../../constants/role";
import { AuthFormError } from "../../auth-form-error/auth-form-error";
import { useResetForm } from "../../../hooks/use-reset-form";
import { useServerRequest } from "../../../hooks/use-server-request";

const regFormSchema = yup.object().shape({
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
    passCheck: yup
        .string()
        .required("Repeat password is required")
        .oneOf([yup.ref("password"), null], "Passwords don't match"),
});

const RegistrationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
            passCheck: "",
        },
        resolver: yupResolver(regFormSchema),
    });

    const [serverError, setServerError] = useState(null);
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);
    const requestServer = useServerRequest();

    useResetForm(reset);

    const onSubmit = ({ login, password }) => {
        requestServer("register", login, password).then(
            ({ error, response }) => {
                if (error) {
                    setServerError(`Request error: ${error}`);
                    return;
                }

                dispatch(setUser(response));
            }
        );
    };

    const formError =
        errors?.login?.message ||
        errors?.password?.message ||
        errors?.passCheck?.message;
    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/"></Navigate>;
    }

    return (
        <div className={className}>
            <h2>Registration</h2>
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

                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    {...register("password", {
                        onChange: () => setServerError(null),
                    })}
                />

                <Input
                    type="password"
                    placeholder="Repeat password"
                    name="password"
                    id="password"
                    {...register("passCheck", {
                        onChange: () => setServerError(null),
                    })}
                />

                <Button disabled={!!formError} type="submit">
                    Sign up
                </Button>

                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </form>
        </div>
    );
};

export const Registration = styled(RegistrationContainer)`
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
