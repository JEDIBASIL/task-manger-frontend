import { useContext, useEffect, useState } from 'react';
import { CiGrid41, CiBoxList, CiGrid31, CiCirclePlus } from "react-icons/ci"
import { ActionIcon, Flex, Loader, Select, SelectItem, Tooltip } from '@mantine/core';
import { requestHandler, useApi } from '../../api/useFetchApi';
import AppContext, { AppContextControls } from '../../context/AppContext';
import { showNotification } from '@mantine/notifications';
import ApiState from '../../interface/api.interface';

interface TaskHeaderProps {
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ }) => {
    const [category, setCategory] = useState<{ value: string, label: string }[]>([]);
    const { setControls, controls } = useContext(AppContext)
    const [state, setState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const { data, loading, error } = useApi({ method: "get", url: "/task/category" })

    useEffect(() => {
        if (data?.status === "success") {
            const newCategory = category.map(item => {
                if (item.label === item.value) return { ...item, value: state.data?.data?._id }
                return item
            })
            setCategory(newCategory)
            setCategory(data.data.map((_id: any, name: string) => ({ label: _id?.name, value: _id?._id })))
        }

    }, [data, error, loading, state])

    useEffect(() => {
        if (state.data?.status === "success") {
            setCategory([...category, { label: state.data?.data?.name, value: state.data?.data?._id }]);
            showNotification({
                title: "Successful",
                message: "category created"
            })
        }

        if (state.error?.status === 500) {
            showNotification({
                title: "Failed",
                message: "an error occurred",
                color: "red"
            })
        }
    }, [state])

    const addCategory = (name: string) => {
        requestHandler(
            {
                method: "post",
                url: "/task/category",
                data: { name }
            },
            setState
        )
        const item = { value: name, label: name };
        console.log(item)
        return item
    }

    return (
        <>
            <Flex mb={10} justify={"space-between"} align={"center"} className='task_filter'>
                <Flex align={"center"} gap={5}>
                    <Tooltip label="new to-dos">
                        <ActionIcon onClick={() => setControls({ ...controls, addTaskDrawer: true } as AppContextControls)} color={"blue"} variant={"filled"}><CiCirclePlus size={22} /></ActionIcon>
                    </Tooltip>

                    <Select
                        placeholder="Category"
                        searchable
                        data={category}
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        nothingFound={!data ? <Loader variant="bars" /> : "type to create category"}
                        onCreate={(query) => addCategory(query)}
                    />
                    <Tooltip label="Tooltip">
                        <ActionIcon variant={"default"}><CiGrid31 size={18} /></ActionIcon>
                    </Tooltip>
                </Flex>
                <Flex align={"center"} gap={5}>
                    <Tooltip label="Grid">
                        <ActionIcon onClick={() => setControls({ ...controls, taskDisplay: "grid" } as AppContextControls)} variant={"default"}><CiGrid41 size={18} /></ActionIcon>
                    </Tooltip>
                    <Tooltip label="List">
                        <ActionIcon onClick={() => setControls({ ...controls, taskDisplay: "list" } as AppContextControls)} variant={"default"}><CiBoxList size={18} /></ActionIcon>
                    </Tooltip>
                </Flex>
            </Flex>
        </>
    );
};

export default TaskHeader;
