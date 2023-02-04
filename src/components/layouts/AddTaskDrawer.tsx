import { Button, Drawer, Grid, Loader, MultiSelect, Select, SelectItem, TextInput, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useContext, useEffect, useState } from 'react';
import { useForm, zodResolver } from "@mantine/form";
import { requestHandler, useApi } from '../../api/useFetchApi';
import ApiState from '../../interface/api.interface';
import { addTodoSchema } from '../../schema';
import AppContext, { AppContextControls } from '../../context/AppContext';
import { showNotification } from '@mantine/notifications';


interface AddTaskDrawerProps {
}

const AddTaskDrawer: React.FC<AddTaskDrawerProps> = ({ }) => {
    const { setControls, controls, addCategory, addTask, addTaskState } = useContext(AppContext)

    const form = useForm({
        validate: zodResolver(addTodoSchema),
        initialValues: {
            name: "",
            description: "",
            starts: null,
            ends: null,
            people: []
        },
    });


    return (
        <>
            <Drawer
                opened={controls?.addTaskDrawer as boolean}
                title={<h1>🎯 New Task</h1>}
                onClose={() => setControls({ ...controls, addTaskDrawer: false } as AppContextControls)}
                padding="xl"
                size="xl"
                position="right"
                overlayOpacity={0}
            >
                <form onSubmit={form.onSubmit((values) => addTask(values))}>
                    <Grid>
                        <Grid.Col span={12}> <TextInput {...form.getInputProps('name')} name={"name"} size={"md"} icon={"⛳️"} placeholder={"Name"} />  </Grid.Col>
                        <Grid.Col span={6}><DatePicker {...form.getInputProps('starts')} name={"starts"} icon={"🏁"} size={"md"} placeholder={"Starts"} /></Grid.Col>
                        <Grid.Col span={6}><DatePicker {...form.getInputProps('ends')} name={"ends"} icon={"🛑"} size={"md"} placeholder={"Ends"} /></Grid.Col>
                        <Grid.Col span={12}> <Select
                            size={"md"}
                            placeholder="Category"
                            {...form.getInputProps('category')} name={"category"}
                            searchable
                            data={controls?.category as SelectItem[]}
                            creatable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            nothingFound={"type to create category"}
                            onCreate={(query) => addCategory(query)} />
                        </Grid.Col>
                        <Grid.Col span={12}> <MultiSelect  {...form.getInputProps('people')} required={false} name={"people"} icon={"👫"} placeholder="People" searchable size={"md"} data={[
                            { value: '63d7ea02bc4927fa45bf97e9', label: 'Jedi' },

                        ]} /> </Grid.Col>
                        <Grid.Col span={12}>
                            <Textarea {...form.getInputProps('description')} icon={"📝"} size={"md"} placeholder={"Description"} />
                        </Grid.Col>
                        <Grid.Col span={12}><Button color={"violet"} loading={addTaskState.loading} size={"md"} type={"submit"}>Add todos</Button></Grid.Col>
                    </Grid>
                </form>
            </Drawer>
        </>
    );
};

export default AddTaskDrawer;
