import React, { useEffect, useState } from 'react';
import { Badge, Button, Checkbox, Flex, Tabs, TextInput, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { addTodoSchema } from '../../schema';
import { useForm, zodResolver } from "@mantine/form";
import { getAuthToken } from '../../utils/auth';
import { requestHandler } from '../../api/useFetchApi';
import ApiState from '../../interface/api.interface';
import { RiSendPlane2Fill } from 'react-icons/ri';

const Task: React.FC = () => {
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
        console.log(task)
        requestHandler(
            {
                method: "post",
                url: "http://localhost:8084/api/v1/task",
                data: task,
            },
            setState
        )
    }
    useEffect(() => {
        console.log(state)
    }, [state])
    return (
        <>
            <div className='task_content'>
                <div className="each_task">
                    <h1>
                        <Textarea autosize unstyled value={"🛍 Go shopping"} />
                    </h1>
                    <p className='sub_text'>
                        <Textarea autosize unstyled value={"If shopping doesn't make you happy, then you're in the wrong shop. Too many people spend money they haven't earned, to buy things they don't want, to impress people they don't like. The odds of going to the store for a loaf of bread and coming out with only a loaf of bread are three billion to one."} />
                    </p>
                    <Tabs defaultValue="gallery" color={"gray"}>
                        <Tabs.List>
                            <Tabs.Tab value="gallery"><h3 className='tab_header'>People</h3></Tabs.Tab>
                            <Tabs.Tab value="messages"><h3 className='tab_header'>Comments</h3></Tabs.Tab>
                            <Tabs.Tab value="settings"><h3 className='tab_header'>Settings</h3></Tabs.Tab>

                        </Tabs.List>

                        <Tabs.Panel value="gallery" pt="xs">
                            <Button>Add people</Button>
                            <div className='people_container'>
                                <ul>
                                    <Checkbox.Group
                                        withAsterisk
                                        spacing={5}
                                    >
                                        <li>
                                            <Checkbox value="react" label={<><h4>king@gmail.com</h4></>} />
                                            <Badge>Badge</Badge>
                                        </li>
                                        <li>
                                            <Checkbox value="react" label={<><h4>king@gmail.com</h4></>} />
                                        </li>
                                    </Checkbox.Group>
                                </ul>
                            </div>
                        </Tabs.Panel>

                        <Tabs.Panel value="messages" pt="xs">
                           <Flex justify={"space-between"} align={"center"}>
                            <Textarea size={'md'} autosize placeholder='Write a comment'/>
                            <Button color={"violet"}><RiSendPlane2Fill size={22} /></Button>
                           </Flex>
                        </Tabs.Panel>

                        <Tabs.Panel value="settings" pt="xs">
                            Settings tab content
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Task;
