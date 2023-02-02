import { Outlet } from "react-router-dom";
import SideBar from "../layouts/SideBar";
import { Button, MantineProvider } from "@mantine/core";
import CalendarDrawer from "../layouts/CalendarDrawer";
import { useContext, useEffect } from "react";
import AddTaskBtn from "../layouts/AddTaskBtn";
import AddTaskDrawer from "../layouts/AddTaskDrawer";
import AppContext from "../../context/AppContext";


const AppContainer: React.FC = () => {
    const { controls } = useContext(AppContext)
    return (
        <>
            <MantineProvider theme={{ colorScheme: controls?.theme }} withGlobalStyles withNormalizeCSS>
                <div data-theme={controls?.theme} className="app_container">
                    <SideBar />
                    <CalendarDrawer />
                    <AddTaskDrawer />
                    <AddTaskBtn />
                    <div style={{ width: "100%" }}>
                        <Outlet />
                    </div>
                </div>
            </MantineProvider>

        </>
    );
};

export default AppContainer;
