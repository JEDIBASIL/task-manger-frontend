import { useState } from 'react';
import { CiGrid41, CiBoxList, CiGrid31, CiCirclePlus } from "react-icons/ci"
import { ActionIcon, Flex, Select, Tooltip } from '@mantine/core';

interface TaskHeaderProps {
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ }) => {
    const [drawer, setDrawer] = useState<boolean>(false);

    return (
        <>
            <Flex mb={10} justify={"space-between"} align={"center"} className='task_filter'>
                <Flex align={"center"} gap={5}>
                    <Tooltip label="new to-dos">
                        <ActionIcon onClick={() => setDrawer(true)} color={"blue"} variant={"filled"}><CiCirclePlus size={22} /></ActionIcon>
                    </Tooltip>

                    <Select
                        placeholder="Category"
                        data={[
                            { value: 'react', label: 'React' },
                            { value: 'ng', label: 'Angular' },
                            { value: 'svelte', label: 'Svelte' },
                            { value: 'vue', label: 'Vue' },
                        ]}
                    />
                    <Tooltip label="Tooltip">
                        <ActionIcon variant={"default"}><CiGrid31 size={18} /></ActionIcon>
                    </Tooltip>
                </Flex>
                <Flex align={"center"} gap={5}>
                    <Tooltip label="Grid">
                        <ActionIcon variant={"default"}><CiGrid41 size={18} /></ActionIcon>
                    </Tooltip>
                    <Tooltip label="List">
                        <ActionIcon variant={"default"}><CiBoxList size={18} /></ActionIcon>
                    </Tooltip>
                </Flex>
            </Flex>
        </>
    );
};

export default TaskHeader;
