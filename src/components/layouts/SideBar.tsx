import { GiAbstract081 } from "react-icons/gi";
import SidebarLink from "./SidebarLink";
import { useLocation } from 'react-router-dom';
import { RxBell, RxHome, RxRocket, RxMoon, RxSun, RxGear, RxExit, RxViewVertical } from "react-icons/rx"
import { Accordion, ActionIcon, Divider, Flex, Text } from "@mantine/core";
import { useContext } from "react";
import AppContext, { AppContextControls } from "../../context/AppContex";

interface SideBarProps {
    className?: string
    theme?: string
}

const SideBar: React.FC<SideBarProps> = ({ className, theme }) => {
    const location = useLocation()
    const { setControls, controls } = useContext(AppContext)

    return (
        <>
            <div data-theme={theme} className={`sidebar ${className}`}>

               { 
               !className?.includes("mobile")
               &&
               <div className="sidebar_top">
                    <a className="logo" href=""><GiAbstract081 />Gram</a>
                    <ActionIcon><RxViewVertical size={20} /></ActionIcon>
                </div>
                }
                <ul >
                    <SidebarLink className={location.pathname !== "/app" ? "inactive" : "active"} icon={<RxHome size={30} />} name={"Home"} path={"/app"} />
                    <SidebarLink icon={<RxBell size={30} />} name={"Notification"} path={"/app/notification"} />
                    <SidebarLink icon={<RxRocket size={30} />} name={"Task"} path={"/app/tasks"} />
                </ul>
                <div className="navbar_bottom">
                    <Divider my="sm" />

                    <div>
                        <h4>Jedidibasil@gmail.com</h4>
                        <Divider my="sm" />
                    </div>
                    <Flex pl={10} pr={10} align={"center"} justify={"space-between"}>
                        <h3>
                            {controls?.theme === "dark" ?
                                <ActionIcon><RxSun onClick={() => setControls({ ...controls, theme: "light" } as AppContextControls)} size={23} /></ActionIcon> :
                                <ActionIcon><RxMoon onClick={() => setControls({ ...controls, theme: "dark" } as AppContextControls)} size={23} /></ActionIcon>
                            }
                        </h3>
                        <ActionIcon><RxGear size={23} /></ActionIcon>
                        <ActionIcon><RxExit size={23} /></ActionIcon>
                    </Flex>
                </div>
            </div>
        </>
    );
};

export default SideBar;
