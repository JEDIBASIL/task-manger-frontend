import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Navbar } from "../../components";
import { Link as A, useNavigate, Navigate } from "react-router-dom"
import { signUpSchema } from "../../schema";
import { useForm, zodResolver } from "@mantine/form";
import { requestHandler } from "../../api/useFetchApi";
import { useEffect, useState } from "react";
import { showNotification } from '@mantine/notifications';
import ApiState from "../../interface/api.interface";
import { isAuth } from "../../utils/auth";



const SignUp: React.FC = () => {
    const navigator = useNavigate();


    const [state, setState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const form = useForm({
        validate: zodResolver(signUpSchema),
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        console.log(state)
        if (state.error?.data?.message.includes("username")) showNotification({
            title: 'Failed',
            message: 'Username taken',
        })
        if (state.error?.data?.message.includes("email")) showNotification({
            title: 'Failed',
            message: 'Email taken',
        })
        if (state.error?.status === 404) showNotification({
            title: 'Error',
            message: 'an error occurred',
        })
        if (state?.data?.status && state.data?.status.includes("success")) {
            navigator("/sent");
            showNotification({
                title: 'Success',
                message: 'Account created',
            })
        }
    }, [state.data, state.error])

    const handleSubmit = (user: any) => {
        let newUser = {
            username: user.username,
            email: user.email,
            password: user.password
        }
        console.log(newUser)
        requestHandler(
            {
                method: "post",
                url: "/user/create",
                data: newUser
            },
            setState
        )

    }

    return (
        <>
            {isAuth("rqwt") ? <Navigate to={`/app/tasks`} />
                :
                <>
                    <Navbar logo />
                    <div className={"form_content"}>
                        <h1>try Gram
                            for free</h1>
                        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                            <TextInput {...form.getInputProps('username')} mb={15} placeholder={"Your username"} size={"lg"} type={"text"} />
                            <TextInput {...form.getInputProps('email')} mb={15} placeholder={"Email"} size={"lg"} type={"email"} />
                            <PasswordInput {...form.getInputProps('password')} mb={15} placeholder={"Password"} size={"lg"} />
                            <Button color={"violet"} fullWidth loading={state.loading} type={"submit"} size={"lg"}>Create account</Button>
                        </form>
                        <p className={"more"}><A to="/sign-in">Sign in</A> if you already have an account</p>
                    </div>
                </>
            }
        </>
    );
};

export default SignUp;



