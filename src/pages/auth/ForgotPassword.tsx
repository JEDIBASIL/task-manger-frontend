import React from 'react';
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Navbar } from "../../components";
import { Link as A } from "react-router-dom"


const ForgotPassword: React.FC = ({  }) => {
    return (
        <>
            <Navbar logo />
            <div className={"form_content"}>
                <h1>Forgot
                    Password</h1>
                <TextInput mb={15} placeholder={"Email"} size={"lg"} type={"email"} />
                <div className='forgot_password_container'><A to="/sign-in">Login</A></div>
                <Button size={"lg"} variant="gradient" gradient={{ from: 'rgb(16, 152, 173) ', to: 'rgb(28, 126, 214)', deg: 105 }}>Reset password</Button>
            </div>
        </>
    );
};

export default ForgotPassword;
