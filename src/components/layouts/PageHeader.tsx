import { Burger, Drawer } from "@mantine/core";
import { useState } from "react";
import { GiAbstract081 } from "react-icons/gi";
import SideBar from "./SideBar";

interface PageHeader {
    name: string;
    emoji: string;
}

const App: React.FC<PageHeader> = ({ emoji, name }) => {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Drawer
                opened={opened}
                title={<a className="logo" href=""><h2><GiAbstract081 />Gram</h2></a>}
                onClose={() => setOpened(false)}
                padding="xs"
                size="md"
                overlayOpacity={0}
            >
                <SideBar  />
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
