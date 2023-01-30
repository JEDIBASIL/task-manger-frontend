import React, { useEffect, useState } from 'react';
import { Button, PasswordInput } from "@mantine/core";
import { Navbar } from "../../components";
import { Link as A, useNavigate, useParams } from "react-router-dom"
import { useForm, zodResolver } from '@mantine/form';
import { requestHandler } from '../../api/useFetchApi';
import { restPasswordSchema } from '../../schema';
import ApiState from '../../interface/api.interface';
import { showNotification } from "@mantine/notifications";


const ResetPassword: React.FC = ({ }) => {
    const params = useParams();
    const token = params.token;
    const navigate = useNavigate();

    const [state, setState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const form = useForm({
        validate: zodResolver(restPasswordSchema),
        initialValues: {
            password: "",
        },
    });

    const handleSubmit = (user: any) => {
        let newPassword = {
            newPassword: user.password,
            token
        }
        console.log(newPassword)
        requestHandler(
            {
                method: "post",
                url: "http://localhost:8084/api/v1/user/reset-password",
                data: newPassword
            },
            setState
        )

    }
    useEffect(() => {
        console.log(state)
        if (state.error?.status === 500) showNotification({
            title: 'Failed',
            message: 'an error occurred',
        })
        if (state?.data?.status && state.data?.status.includes("success")) {
            navigate("/sign-in");
        }
    }, [state.data, state.error])
    return (
        <>
            <Navbar logo />
            <div className={"form_content"}>
                <h1>Reset password</h1>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <PasswordInput  {...form.getInputProps('password')} placeholder={"New password"} size={"lg"} />
                    <div className='forgot_password_container'><A to="/sign-in">Login</A></div>
                    <Button loading={state.loading} type={"submit"} size={"lg"} >Reset password</Button>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
