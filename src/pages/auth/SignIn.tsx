import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Navbar } from "../../components";
import { Link as A, useNavigate } from "react-router-dom"
import { signInSchema } from "../../schema";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import ApiState from "../../interface/api.interface";
import { requestHandler } from "../../api/useFetchApi";

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [state, setState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const form = useForm({
        validate: zodResolver(signInSchema),
        initialValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = (user: any) => {
        let newUser = {
            email: user.email,
            password: user.password
        }
        console.log(newUser)
        requestHandler(
            {
                method: "post",
                url: "http://localhost:8084/api/v1/user/login",
                data: newUser
            },
            setState
        )

    }

    useEffect(() => {
        console.log(state)
        if (state.error?.data.includes("incorrect")) showNotification({
            title: 'Failed',
            message: 'Incorrect email or password',
        })
        if (state.error?.data.includes("verified")) showNotification({
            title: 'Failed',
            message: 'account not verified',
        })
        if (state.error?.data.includes("failed") || state.error?.data.includes("error")) showNotification({
            title: 'Error',
            message: 'an error occurred',
        })
        if (state?.data?.status && state.data?.status.includes("success")) {
            showNotification({
                title: 'Success',
                message: 'Account verified',
            })
            navigate("/app");
        }
    }, [state.data, state.error])

    return (
        <>
            <Navbar logo />
            <div className={"form_content"}>
                <h1>Welcome
                    Back</h1>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput  {...form.getInputProps('email')} mb={15} placeholder={"Email"} size={"lg"} type={"email"} />
                    <PasswordInput  {...form.getInputProps('password')} mb={15} placeholder={"Password"} size={"lg"} />
                    <div className='forgot_password_container'><A to="/forgot-password">Forgot password?</A></div>
                    <Button loading={state.loading} type={"submit"} size={"lg"}>Sign in</Button>
                </form>
                <p className={"more"}><A to="/sign-up">Sign up</A> if you don't have an account</p>
            </div>
        </>
    );
};

export default SignIn;
