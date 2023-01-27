import { ActionIcon } from "@mantine/core";
import { NavLink as A } from "react-router-dom"
interface SidebarLinkProps {
    name: string;
    icon: React.ReactElement;
    path: string;
    className?:string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ name, path, icon,className }) => {
    return (
        <>
            <li>
                <A to={path} className={className}>
                    <ActionIcon size={20} variant="transparent" >
                        {icon}
                    </ActionIcon>
                    <span>{name}</span>
                </A>
            </li>
        </>
    );
};

export default SidebarLink;
