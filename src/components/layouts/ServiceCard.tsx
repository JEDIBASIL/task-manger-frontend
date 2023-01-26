
interface ServiceCardProps {
    title: string;
    icon: React.ReactElement;
    text: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, text }) => {
    return (
        <>
            <div className="card">
                {icon}
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </>
    );
};

export default ServiceCard;
