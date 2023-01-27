import { GiAbstract081 } from "react-icons/gi"
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
                            <a href="">Login</a>
                            <a href=""><button>Get started</button></a>
                        </div>
                        :
                        <></>
                }
            </nav>
        </>
    );
};

export default Navbar;
