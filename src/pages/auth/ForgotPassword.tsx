import React, { useEffect, useState } from 'react';
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Navbar } from "../../components";
import { Link as A, useNavigate } from "react-router-dom"
import { useForm, zodResolver } from '@mantine/form';
import { requestHandler } from '../../api/useFetchApi';
import { forgotPasswordEmailSchema, signInSchema } from '../../schema';
import ApiState from '../../interface/api.interface';
import { showNotification } from "@mantine/notifications";


const ForgotPassword: React.FC = ({ }) => {
    const navigate = useNavigate();

    const [state, setState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const form = useForm({
        validate: zodResolver(forgotPasswordEmailSchema),
        initialValues: {
            email: "",
        },
    });

    const handleSubmit = (user: any) => {
        let userEmail = {
            email: user.email,
        }
        console.log(userEmail)
        requestHandler(
            {
                method: "post",
                url: "http://localhost:8084/api/v1/user/password-mail",
                data: userEmail
            },
            setState
        )

    }
    useEffect(() => {
        console.log(state)
        if (state.error?.data.includes("mail")) showNotification({
            title: 'Failed',
            message: 'an error occurred',
        })
        if (state?.data?.status && state.data?.message.includes("sent")) {
            navigate("/sent");
        }
    }, [state.data, state.error])
    return (
        <>
            <Navbar logo />
            <div className={"form_content"}>
                <h1>Forgot
                    Password</h1>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput  {...form.getInputProps('email')} placeholder={"Email"} size={"lg"} type={"email"} />
                    <div className='forgot_password_container'><A to="/sign-in">Login</A></div>
                    <Button color={"violet"} fullWidth loading={state.loading} type={"submit"} size={"lg"} >Reset password</Button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
