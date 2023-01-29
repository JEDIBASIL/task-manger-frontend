import { Outlet } from "react-router-dom";
import SideBar from "../layouts/SideBar";
import { MantineProvider } from "@mantine/core";


const AppContainer: React.FC = () => {
    return (
        <>
            <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
            <div data-theme="dark" className="app_container">
                <SideBar />
                <div style={{width:"100%"}}>
                    <Outlet />
                </div>
            </div>
            </MantineProvider>

        </>
    );
};

export default AppContainer;
