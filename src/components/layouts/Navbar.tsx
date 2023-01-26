import {GiAbstract081} from "react-icons/gi"


const Navbar: React.FC = () => {
    return (
        <>
            <nav>
                <a className="logo" href=""><GiAbstract081 />Gram</a>
                <div className="nav_btns">
                    <a href="">Login</a>
                    <a href=""><button>Get started</button></a>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
