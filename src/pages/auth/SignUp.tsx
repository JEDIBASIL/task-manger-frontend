import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Navbar } from "../../components";
import { Link as A } from "react-router-dom"



const SignUp: React.FC = () => {
    return (
        <>
            <Navbar logo />
            {/* <MantineProvider theme={{ colorScheme: 'dark' }}> */}

            <div className={"form_content"}>
                <h1>try Gram
                    for free</h1>
                <TextInput mb={15} placeholder={"Your username"} size={"lg"} type={"text"} />
                <TextInput mb={15} placeholder={"Email"} size={"lg"} type={"email"} />
                <PasswordInput mb={15} placeholder={"Password"} size={"lg"} />
                <Button size={"lg"} variant="gradient" gradient={{ from: 'rgb(16, 152, 173) ', to: 'rgb(28, 126, 214)', deg: 105 }}>Create account</Button>
                <p className={"more"}><A to="/sign-in">Sign in</A> if you already have an account</p>
            </div>
            {/* </MantineProvider> */}

        </>
    );
};

export default SignUp;
