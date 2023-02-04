import { createContext, useEffect, useState } from "react";
import { requestHandler, useApi } from "../api/useFetchApi";
import ApiState from "../interface/api.interface";
import { showNotification } from "@mantine/notifications";

export class Category {
    value!: string;
    label!: string;
}
export class AppContextControls {
    theme: "dark" | "light" = "light"
    taskDisplay: "list" | "grid" = "list"
    calendarHeader: Date | undefined
    addTaskDrawer: boolean | undefined;
    calendarDrawer: boolean | undefined;
    mobileDrawer: boolean | undefined;
    monitor: number = 0;
    category: Category[] = [];
    tasks: any[] = []
}

interface IAppContext {
    controls: AppContextControls | undefined
    setControls: React.Dispatch<React.SetStateAction<AppContextControls | undefined>>
    addCategory: (name: string) => Category
    addTask: (task: any) => void
    deleteTask: (task: string) => void
    updateTask: (updates: any, task: string) => void
    addTaskState: ApiState
    updateTaskState: ApiState
    deleteTaskState: ApiState
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppContextProvider = ({ children, }: { children: React.ReactNode; }) => {
    const [controls, setControls] = useState<AppContextControls>()
    const [addCategoryState, setAddCategoryState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const [addTaskState, setAddTaskState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const [taskState, taskSetState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const [updateTaskState, setUpdateTaskState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const [deleteTaskState, setDeleteTaskState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const fetchedTask = useApi({ method: "get", url: "/task" }, [addTaskState?.data, deleteTaskState?.data])
    let fetchedCategory: ApiState = useApi({ method: "get", url: "/task/category" }, [])

    useEffect(() => {
        if (fetchedCategory.data?.status === "success") {
            const newCategory = controls?.category?.map(item => {
                if (item.label === item.value) return { ...item, value: addCategoryState.data?.data?._id }
                return item
            })
            setControls((current: AppContextControls | undefined) =>({ ...current, category: newCategory } as AppContextControls))
            setControls((current: AppContextControls | undefined) =>({ ...current, category: fetchedCategory?.data?.data.map((_id: any, name: string) => ({ label: _id?.name, value: _id?._id })) } as AppContextControls))
        }

    }, [fetchedCategory, addCategoryState])

    useEffect(() => {
        if (addCategoryState.data?.status === "success") {
            setControls((current: AppContextControls | undefined) => ({ ...current, category: [...controls?.category as Category[], { label: addCategoryState.data?.data?.name, value: addCategoryState.data?.data?._id }] } as AppContextControls));
            showNotification({
                title: "Successful",
                message: "category created"
            })
        }

        if (addCategoryState.error?.status === 500) {
            showNotification({
                title: "Failed",
                message: "an error occurred",
                color: "red"
            })
        }
    }, [addCategoryState])

    useEffect(() => {
        requestHandler(
            {
                method: "get",
                url: `/task`,
            },
            taskSetState
        )
        if (fetchedTask.data?.status === "success") {
            setControls((current: AppContextControls | undefined) => ({ ...current, tasks: fetchedTask.data?.data?.tasks } as AppContextControls))
        }
    }, [fetchedTask])
    useEffect(() => {
        if (addTaskState.data?.status === "success") {
            showNotification({
                title: "Successful",
                message: "task added"
            })
        }

        if (addTaskState.error?.status === 500) {
            showNotification({
                title: "Failed",
                message: "an error occurred",
                color: "red"
            })
        }

        if (addTaskState.error?.status === 401) {
            showNotification({
                title: "Failed",
                message: "token is required",
                color: "red"
            })
        }
    }, [addTaskState])

    useEffect(() => {
        if (updateTaskState.data?.status === "success") {
            showNotification({
                title: "Successful",
                message: "task edited"
            })
        }

        if (updateTaskState.error?.status === 500) {
            showNotification({
                title: "Failed",
                message: "an error occurred",
                color: "red"
            })
        }
        if (updateTaskState.error?.status === 404) {
            showNotification({
                title: "Failed",
                message: "task not found",
                color: "red"
            })
        }
    }, [updateTaskState])
    useEffect(() => {
        if (deleteTaskState.data?.status === "success") {
            showNotification({
                title: "Successful",
                message: "task deleted"
            })
        }

        if (deleteTaskState.error?.status === 500) {
            showNotification({
                title: "Failed",
                message: "an error occurred",
                color: "red"
            })
        }

        if (deleteTaskState.error?.status === 404) {
            showNotification({
                title: "Failed",
                message: "task not found",
                color: "red"
            })
        }
    }, [deleteTaskState])

    const addCategory = (name: string) => {
        requestHandler(
            {
                method: "post",
                url: "/task/category",
                data: { name }
            },
            setAddCategoryState
        )
        const item = { value: name, label: name };
        return item
    }
    const addTask = (task: any) => {
        requestHandler(
            {
                method: "post",
                url: "/task",
                data: task,
            },
            setAddTaskState
        )
    }
    const updateTask = (updates: any, task: string) => {
        console.log(task)
        requestHandler(
            {
                method: "put",
                url: `/task/${task}`,
                data: updates,
            },
            setUpdateTaskState
        )
    }
    const deleteTask = (id: string) => {
        requestHandler(
            {
                method: "delete",
                url: `/task/${id}`,
            },
            setDeleteTaskState
        )
    }




    return (
        <AppContext.Provider value={{ deleteTask, updateTaskState, deleteTaskState, updateTask, addTaskState, controls, setControls, addCategory, addTask }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppContext;
