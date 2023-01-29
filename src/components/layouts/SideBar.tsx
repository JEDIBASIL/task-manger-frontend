import { GiAbstract081 } from "react-icons/gi";
import SidebarLink from "./SidebarLink";
import { useLocation } from 'react-router-dom';
import { RxBell, RxHome, RxRocket } from "react-icons/rx"
import { Accordion } from "@mantine/core";


const SideBar: React.FC = () => {
    const location = useLocation()

    return (
        <>
            <div className="sidebar">
                <div>
                    {/* <a className="logo" href=""><GiAbstract081 />Gram</a> */}
                </div>
                <ul >
                    <SidebarLink className={location.pathname !== "/app" ? "inactive" : "active"} icon={<RxHome size={30} />} name={"Home"} path={"/app"} />
                    <SidebarLink icon={<RxBell size={30} />} name={"Notification"} path={"/app/notification"} />
                    <SidebarLink icon={<RxRocket size={30} />} name={"Task"} path={"/app/task"} />
                    <div className="sidebar_recent_task">
                        <Accordion defaultValue="customization">
                            <Accordion.Item value="flexibility">
                                <Accordion.Control><h3>Recent task</h3></Accordion.Control>
                                <Accordion.Panel>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default SideBar;
