import { Navbar } from "../../components";
import mailImage from "../../assets/img/Confirmed-bro.svg"
import { useNavigate, useParams } from "react-router-dom"
import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import ApiState from "../../interface/api.interface";
import { showNotification } from "@mantine/notifications";
import { requestHandler } from "../../api/useFetchApi";

const Verify: React.FC = () => {
    const params = useParams();
    const token = params.token;
    const navigate = useNavigate();
    const [state, setState] = useState<ApiState>({
        data: null,
        loading: true,
        error: null
    });
    useEffect(() => {
        requestHandler(
            {
                method: "post",
                url: "http://localhost:8084/api/v1/user/verify",
                data: { token }
            },
            setState
        )
    }, [])
    useEffect(() => {
        console.log(state)
        if (state.error?.data.includes("verified")) {
            navigate("/sign-in");
            showNotification({
                title: 'Failed',
                message: 'account already verified',
            })
        }
        if (state.error?.data.includes("invalid")) showNotification({
            title: 'Failed',
            message: 'invalid token',
        })
        if (state.error?.data.includes("failed")
            || state.error?.data.includes("error")
            || state.error?.data.includes("jwt")
        ) showNotification({
            title: 'Error',
            message: 'an error occurred',
        })
        if (state?.data?.status && state.data?.status.includes("success")) {
            showNotification({
                title: 'Success',
                message: 'Account verified',
            })
            navigate("/sign-in");
        }
    }, [state.loading])
    return (
        <>
            <Navbar logo />
            <div className={"form_content"}>

                <div className="img_container">
                    {
                        !state?.data?.status
                            ?
                            <>
                                {state.loading && <><Loader size={"xl"} /></>}
                                <h2>Verifying account</h2>
                            </>
                            :
                            <>
                                {

                                    <>
                                        <img src={mailImage} alt="" />
                                        <p>Account verified</p>
                                    </>
                                }
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default Verify;
