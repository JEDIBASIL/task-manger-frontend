import React, { useState } from 'react';
import { PageHeader, ToDoList } from '../../components';
import { CiGrid41, CiBoxList, CiGrid31, CiCirclePlus } from "react-icons/ci"
import { ActionIcon, Button, Drawer, Flex, Grid, MultiSelect, Select, TextInput, Tooltip } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { addTodoSchema } from '../../schema';
import { useForm, zodResolver } from "@mantine/form";

const Task: React.FC = () => {
    const [drawer, setDrawer] = useState<boolean>(false);
    const form = useForm({
        validate: zodResolver(addTodoSchema),
        initialValues: {
            name: "",
            starting: null,
            ends: null,
            people: []
        },
    });

    const handleSubmit = (task: any) => {
        console.log(task)
    }
    return (
        <>
            <Drawer
                opened={drawer}
                title={<h1>🎯 New Task</h1>}
                onClose={() => setDrawer(false)}
                padding="xl"
                size="xl"
                position="right"
                overlayOpacity={0}
            >
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <Grid>
                        <Grid.Col span={12}> <TextInput {...form.getInputProps('name')} name={"name"} size={"md"} icon={"⛳️"} placeholder={"Name"} />  </Grid.Col>
                        <Grid.Col span={6}><DatePicker {...form.getInputProps('starts')} name={"starts"} icon={"🏁"} size={"md"} placeholder={"Starts"} /></Grid.Col>
                        <Grid.Col span={6}><DatePicker {...form.getInputProps('ends')} name={"ends"} icon={"🛑"} size={"md"} placeholder={"Ends"} /></Grid.Col>
                        <Grid.Col span={12}> <Select
                            size={"md"}
                            placeholder="Category"
                            {...form.getInputProps('category')} name={"category"}
                            data={[
                                { value: 'react', label: 'React' },
                                { value: 'ng', label: 'Angular' },
                                { value: 'svelte', label: 'Svelte' },
                                { value: 'vue', label: 'Vue' },
                            ]}
                        />
                        </Grid.Col>
                        <Grid.Col span={12}> <MultiSelect  {...form.getInputProps('people')} required={false} name={"people"} icon={"👫"} placeholder="People" searchable size={"md"} data={[
                            { value: 'react', label: 'React' },
                            { value: 'ng', label: 'Angular' },
                            { value: 'svelte', label: 'Svelte' },
                            { value: 'vue', label: 'Vue' },
                            { value: 'riot', label: 'Riot' },
                            { value: 'next', label: 'Next.js' },
                            { value: 'blitz', label: 'Blitz.js' },

                        ]} /> </Grid.Col>
                        <Grid.Col span={12}><Button size={"md"} type={"submit"}>Add todos</Button></Grid.Col>
                    </Grid>

                </form>
            </Drawer>
            <div className='task_content'>
                <PageHeader emoji={"🚀"} name={"Task"} />

                <div className='task_container'>
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
                    <ul className=''>
                        <ToDoList />
                    </ul>
                    <div className='category'>
                        <div>
                            <Button mb={10} variant='light' fullWidth>Food</Button>
                            <ul className='flex'>
                              <ToDoList />
                                <ToDoList />
                            </ul>
                        </div>
                        <div>
                            <Button mb={10} color={"teal"} variant='light' fullWidth>Activities</Button>
                            <ul className='flex'>
                              <ToDoList />
                                <ToDoList />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Task;
