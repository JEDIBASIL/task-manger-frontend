import React, { useEffect, useState } from 'react';
import { PageHeader, ToDoList } from '../../components';
import {  Button, Drawer, Grid, MultiSelect, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { addTodoSchema } from '../../schema';
import { useForm, zodResolver } from "@mantine/form";
import { getAuthToken } from '../../utils/auth';
import { requestHandler } from '../../api/useFetchApi';
import ApiState from '../../interface/api.interface';

const Tasks: React.FC = () => {
    const [drawer, setDrawer] = useState<boolean>(false);
    const [state, setState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const form = useForm({
        validate: zodResolver(addTodoSchema),
        initialValues: {
            name: "",
            starts: null,
            ends: null,
            people: []
        },
    });

    const handleSubmit = (task: any) => {
        const config = {
            headers: {
                "Authorization": `Bearer ${getAuthToken("rqwt")}`
            }
        }
        console.log(task)
        requestHandler(
            {
                method: "post",
                url: "http://localhost:8084/api/v1/task/add",
                data: task,
                headers: config,
            },
            setState
        )
    }
    useEffect(() => {
        console.log(state)
    }, [state])
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
                                { value: '63d7ea02bc4927fa45bf97e9', label: 'Vue' },
                            ]}
                        />
                        </Grid.Col>
                        <Grid.Col span={12}> <MultiSelect  {...form.getInputProps('people')} required={false} name={"people"} icon={"👫"} placeholder="People" searchable size={"md"} data={[
                            { value: '63d7ea02bc4927fa45bf97e9', label: 'Jedi' },

                        ]} /> </Grid.Col>
                        <Grid.Col span={12}><Button size={"md"} type={"submit"}>Add todos</Button></Grid.Col>
                    </Grid>

                </form>
            </Drawer>
            <PageHeader emoji={"🚀"} name={"Task"} />
            <div className='task_content'>

                <div className='task_container'>
                    <ul className=''>
                        <ToDoList />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Tasks;
