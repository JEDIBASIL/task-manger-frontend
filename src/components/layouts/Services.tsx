import ServiceCard from "./ServiceCard";
import { ActionIcon } from "@mantine/core"
import { RiCalendarTodoLine } from "react-icons/ri"

const Services: React.FC = () => {
    return (
        <>
            <div className="services">
                <div className="service_container">
                    <ServiceCard icon={<ActionIcon size={40}><RiCalendarTodoLine size={35} color={"rgb(16, 152, 173)"} /></ActionIcon>} text={""} title={"Todo-lists"} />
                </div>
            </div>
        </>
    );
};

export default Services;
