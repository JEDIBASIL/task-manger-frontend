import React, { createContext, useState } from "react";

export class AppContextControls {
    theme: "dark" | "light" = "light"
    taskDisplay: "list" | "grid" = "list"
    calendarHeader: Date | undefined
    addTaskDrawer: boolean | undefined;
    calendarDrawer: boolean | undefined;
    mobileDrawer: boolean | undefined;
}


interface IAppContext {
    controls: AppContextControls | undefined
    setControls: React.Dispatch<React.SetStateAction<AppContextControls | undefined>>
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppContextProvider = ({ children, }: { children: React.ReactNode; }) => {
    const [controls, setControls] = useState<AppContextControls>()

    return (
        <AppContext.Provider value={{ controls, setControls }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppContext;
