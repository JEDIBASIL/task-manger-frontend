import { Navbar } from "../../components";
import mailImage from "../../assets/img/Envelope-rafiki.svg"
import { Link as A } from "react-router-dom"

const MailSent: React.FC = () => {
    return (
        <>
            <Navbar logo />
            <div className={"form_content"}>
                <div className="img_container">
                    <img src={mailImage} alt="" />
                    <p>Password reset email sent!</p>
                    <A  to="/sign-in"><h2>Login</h2></A>
                </div>
            </div>
        </>
    );
};

export default MailSent;
