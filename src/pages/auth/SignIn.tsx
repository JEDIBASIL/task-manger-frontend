import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Navbar } from "../../components";
import { Link as A, useNavigate } from "react-router-dom"
import { signInSchema } from "../../schema";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import ApiState from "../../interface/api.interface";
import { requestHandler } from "../../api/useFetchApi";
import { setAuthToken } from "../../utils/auth";

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
                url: "/user/login",
                data: newUser
            },
            setState
        )

    }

    useEffect(() => {
        console.log(state)
        if (state.error?.status === 404) showNotification({
            title: 'Failed',
            message: 'Incorrect email or password',
        })
        if (state.error?.status === 403) {
            showNotification({
                title: 'Failed',
                message: 'account not verified',
            })
            requestHandler(
                {
                    method: "post",
                    url: "http://localhost:8084/api/v1/user/resend-mail",
                    data: { email: form?.values?.email }
                },
                setState
            )

        }
        if (state.error?.status === 500) showNotification({
            title: 'Error',
            message: 'an error occurred',
        })
        if (state?.data?.status && state.data?.message.includes("authenticated")) {
            const setAuth = setAuthToken("rqwt", state.data?.data?.accessToken)
            console.log(setAuth)
            showNotification({
                title: 'Success',
                message: 'Account verified',
            })
            navigate("/app");
        }
        if (state?.data?.status && state.data?.message.includes("sent")) {
            console.log("sent")
            navigate("/sent");
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
                    <PasswordInput  {...form.getInputProps('password')} placeholder={"Password"} size={"lg"} />
                    <div className='forgot_password_container'><A to="/forgot-password">Forgot password?</A></div>
                    <Button color={"violet"} fullWidth loading={state.loading} type={"submit"} size={"lg"}>Sign in</Button>
                </form>
                <p className={"more"}><A to="/sign-up">Sign up</A> if you don't have an account</p>
            </div>
        </>
    );
};

export default SignIn;
