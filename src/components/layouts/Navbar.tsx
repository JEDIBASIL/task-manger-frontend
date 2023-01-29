import { GiAbstract081 } from "react-icons/gi"
import { Link as A } from "react-router-dom"

interface NavbarProps {
    logo?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
    return (
        <>
            <nav>
                <a className="logo" href=""><GiAbstract081 />Gram</a>
                {
                    !logo
                        ?
                        <div className="nav_btns">
                            <A to="/sign-in">Login</A>
                            <A to="/sign-up"><button>Get started</button></A>
                        </div>
                        :
                        <></>
                }
            </nav>
        </>
    );
};

export default Navbar;
