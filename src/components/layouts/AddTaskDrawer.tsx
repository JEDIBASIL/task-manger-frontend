import { Button, Drawer, Grid, Loader, MultiSelect, Select, TextInput, Textarea } from '@mantine/core';
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
    const { setControls, controls } = useContext(AppContext)
    const [state, setState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const [state2, setState2] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const [category, setCategory] = useState<{ value: string, label: string }[]>([]);
    const { data, loading, error } = useApi({ method: "get", url: "/task/category" })

    useEffect(() => {
        if (data?.status === "success") {
            setCategory(data.data.map((_id: any, name: string) => ({ label: _id?.name, value: _id?._id })))
        }

    }, [data, error, loading])
    useEffect(() => {
        if (state.data?.status === "success") {
            showNotification({
                title: "Successful",
                message: "task added"
            })
        }

        if (state.error?.status === 500) {
            showNotification({
                title: "Failed",
                message: "an error occurred",
                color: "red"
            })
        }

        if (state.error?.status === 401) {
            showNotification({
                title: "Failed",
                message: "token is required",
                color: "red"
            })
        }
    }, [state])
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

        console.log(task)
        requestHandler(
            {
                method: "post",
                url: "/task",
                data: task,
            },
            setState
        )
    }
    useEffect(() => {
        console.log(state)
    }, [state])
    useEffect(() => {
        if (state2.data?.status === "success") {
            setCategory([...category, { label: state2.data?.data?.name, value: state2.data?.data?._id }]);
            showNotification({
                title: "Successful",
                message: "category created"
            })
        }

        if (state2.error?.status === 500) {
            showNotification({
                title: "Failed",
                message: "an error occurred",
                color: "red"
            })
        }
    }, [state2])

    const addCategory = (name: string) => {
        requestHandler(
            {
                method: "post",
                url: "/task/category",
                data: { name }
            },
            setState2
        )
        const item = { value: name, label: name };
        console.log(item)
        return item
    }

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
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <Grid>
                        <Grid.Col span={12}> <TextInput {...form.getInputProps('name')} name={"name"} size={"md"} icon={"⛳️"} placeholder={"Name"} />  </Grid.Col>
                        <Grid.Col span={6}><DatePicker {...form.getInputProps('starts')} name={"starts"} icon={"🏁"} size={"md"} placeholder={"Starts"} /></Grid.Col>
                        <Grid.Col span={6}><DatePicker {...form.getInputProps('ends')} name={"ends"} icon={"🛑"} size={"md"} placeholder={"Ends"} /></Grid.Col>
                        <Grid.Col span={12}> <Select
                            size={"md"}
                            placeholder="Category"
                            {...form.getInputProps('category')} name={"category"}
                            searchable
                            data={category}
                            creatable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            nothingFound={category.length === 0 ? <Loader variant="bars" /> : "type to create category"}
                            onCreate={(query) => addCategory(query)} />
                        </Grid.Col>
                        <Grid.Col span={12}> <MultiSelect  {...form.getInputProps('people')} required={false} name={"people"} icon={"👫"} placeholder="People" searchable size={"md"} data={[
                            { value: '63d7ea02bc4927fa45bf97e9', label: 'Jedi' },

                        ]} /> </Grid.Col>
                        <Grid.Col span={12}>
                            <Textarea icon={"📝"} size={"md"} placeholder={"Description"} />
                        </Grid.Col>
                        <Grid.Col span={12}><Button color={"violet"} loading={state.loading} size={"md"} type={"submit"}>Add todos</Button></Grid.Col>
                    </Grid>
                </form>
            </Drawer>
        </>
    );
};

export default AddTaskDrawer;
