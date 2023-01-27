import { GiAbstract081 } from "react-icons/gi";
import SidebarLink from "./SidebarLink";
import { useLocation } from 'react-router-dom';
import { RxBell, RxHome, RxRocket } from "react-icons/rx"


const SideBar: React.FC = () => {
    const location = useLocation()

    return (
        <>
            <div className="sidebar">
                <div>
                    {/* <a className="logo" href=""><GiAbstract081 />Gram</a> */}
                </div>
                <ul >
                    <SidebarLink className={location.pathname !== "/app" ? "inactive" : "active"} icon={<RxHome size={26} />} name={"Home"} path={"/app"} />
                    <SidebarLink icon={<RxBell size={26} />} name={"Notification"} path={"/app/notification"} />
                    <SidebarLink icon={<RxRocket size={26} />} name={"Task"} path={"/app/task"} />
                    <div className="sidebar_recent_task">
                        <h3>Recent task</h3>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default SideBar;
