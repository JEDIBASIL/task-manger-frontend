import { useContext, useEffect, useState } from 'react';
import { CiGrid41, CiBoxList, CiGrid31, CiCirclePlus } from "react-icons/ci"
import { ActionIcon, Flex, Loader, Select, SelectItem, Tooltip } from '@mantine/core';
import AppContext, { AppContextControls } from '../../context/AppContext';


const TaskHeader: React.FC = () => {
    const { setControls, controls, addCategory } = useContext(AppContext)
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
                        data={controls?.category as SelectItem[]}
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        nothingFound={"type to create category"}
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
