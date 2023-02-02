import { useContext, useEffect, useState } from 'react';
import { CiGrid41, CiBoxList, CiGrid31, CiCirclePlus } from "react-icons/ci"
import { ActionIcon, Flex, Loader, Select, Tooltip } from '@mantine/core';
import { useApi } from '../../api/useFetchApi';
import AppContext, { AppContextControls } from '../../context/AppContext';

interface TaskHeaderProps {
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ }) => {
    const [category, setCategory] = useState<{ value: string, label: string }[]>([]);
    const {setControls,controls} = useContext(AppContext)

    const { data, loading, error } = useApi({ method: "get", url: "/task/category" })

    useEffect(() => {
        if (data?.status === "success") {
            setCategory(data.data.map((_id: any, name: string) =>({ label: _id?.name, value: _id?._id })))
        }

    }, [data, error, loading])

    return (
        <>
            <Flex mb={10} justify={"space-between"} align={"center"} className='task_filter'>
                <Flex align={"center"} gap={5}>
                    <Tooltip label="new to-dos">
                        <ActionIcon onClick={() => setControls({...controls, addTaskDrawer:true} as AppContextControls)} color={"blue"} variant={"filled"}><CiCirclePlus size={22} /></ActionIcon>
                    </Tooltip>

                    <Select
                        placeholder="Category"
                        searchable
                        data={category}
                        nothingFound={category.length === 0 ? <Loader variant="bars" /> : "category not found"}
                    />
                    <Tooltip label="Tooltip">
                        <ActionIcon variant={"default"}><CiGrid31 size={18} /></ActionIcon>
                    </Tooltip>
                </Flex>
                <Flex align={"center"} gap={5}>
                    <Tooltip label="Grid">
                        <ActionIcon onClick={() => setControls({...controls, taskDisplay:"grid"} as AppContextControls)}   variant={"default"}><CiGrid41 size={18} /></ActionIcon>
                    </Tooltip>
                    <Tooltip label="List">
                        <ActionIcon onClick={() => setControls({...controls, taskDisplay:"list"} as AppContextControls)}   variant={"default"}><CiBoxList size={18} /></ActionIcon>
                    </Tooltip>
                </Flex>
            </Flex>
        </>
    );
};

export default TaskHeader;
