import { Burger, Drawer } from "@mantine/core";
import { useContext, useState } from "react";
import { GiAbstract081 } from "react-icons/gi";
import SideBar from "./SideBar";
import AppContext from "../../context/AppContex";

interface PageHeader {
    name: string;
    emoji: string;
}

const App: React.FC<PageHeader> = ({ emoji, name }) => {
    const [opened, setOpened] = useState(false);
    const { setControls, controls } = useContext(AppContext)
    const style: any = {
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    }
    const logoStyle: any = {
        display: "flex",
        alignItems: "center",
        fontSize: "25px",
        fontWeight: "600",
        lineHeight: "1",
        padding: "0px 10px",
        gap: "5px",
    }
    return (
        <>
            <Drawer
                opened={opened}
                title={
                    <div style={style}>
                        <a style={logoStyle} className="logo" href=""><GiAbstract081 />Gram</a>
                    </div>
                }
                onClose={() => setOpened(false)}
                padding={0}
                size="md"
                overlayOpacity={0}
            >
                <SideBar theme={controls?.theme} className={"mobile"} />
            </Drawer>
            <div className="page_header">
                <h2><span>{emoji} {name}</span></h2>
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                />
            </div>
        </>
    );
};

export default App;
