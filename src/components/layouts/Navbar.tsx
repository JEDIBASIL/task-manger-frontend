import { Burger, Drawer } from "@mantine/core";
import { useState } from "react";
import { GiAbstract081 } from "react-icons/gi"
import { Link as A } from "react-router-dom"

interface NavbarProps {
    logo?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
    const [drawer,setDrawer] = useState<boolean>(false)
    return (
        <>
            <nav>
                <a className="logo" href=""><GiAbstract081 />Gram</a>
                {
                    !logo
                        ?
                        <>
                        <Drawer onClose={()=> setDrawer(false)} opened={drawer}>

                        </Drawer>
                        <div className="nav_btns">
                            <A to="/sign-in">Login</A>
                            <A to="/sign-up"><button>Get started</button></A>
                        </div>
                        <div className="burger_container">
                            <Burger onClick={()=> setDrawer(true)}   opened={drawer} size={"md"} />
                        </div>
                        </>
                        :
                        <></>
                }
            </nav>
        </>
    );
};

export default Navbar;
