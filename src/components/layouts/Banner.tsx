import heroImg from "../../assets/img/Timeline-bro.svg"
import { motion, useScroll, useTransform } from "framer-motion";

const Banner: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const scale = useTransform(scrollYProgress, [0, 1], ["100%", "110%"]);
    return (
        <>
            <div className="banner">
                <div className="text">
                    <h1>Make <span>Everyday</span> </h1>
                    <h1><span>Count</span></h1>
                    <p>Teddy is your daily app to track, manager and helps you achieve your goals</p>
                    <div className="baner_form_container"><input placeholder="Enter email address" type="email" /> <button>Get started for free</button></div>
                </div>
                <motion.div
                   
                >
                    <img src={heroImg} alt="" />
                </motion.div>
            </div>
        </>
    );
};

export default Banner;
