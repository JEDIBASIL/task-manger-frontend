import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Navbar } from "../../components";
import { Link as A } from "react-router-dom"

const SignIn: React.FC = () => {
    return (
        <>
            <Navbar logo />
            <div className={"form_content"}>
                <h1>Welcome
                    Back</h1>
                <TextInput mb={15} placeholder={"Email"} size={"lg"} type={"email"} />
                <PasswordInput mb={15} placeholder={"Password"} size={"lg"} />
                <div className='forgot_password_container'><A to="/forgot-password">Forgot password?</A></div>
                <Button size={"lg"} variant="gradient" gradient={{ from: 'rgb(16, 152, 173) ', to: 'rgb(28, 126, 214)', deg: 105 }}>Create account</Button>
                <p className={"more"}><A to="/sign-up">Sign up</A> if you don't have an account</p>
            </div>
        </>
    );
};

export default SignIn;
