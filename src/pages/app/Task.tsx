import React, { useContext, useEffect, useState } from 'react';
import { Badge, Button, Center, Checkbox, Flex, Loader, Select, SelectItem, Tabs, TextInput, Textarea } from '@mantine/core';
import { updateTaskSchema } from '../../schema';
import { UseFormReturnType, useForm, zodResolver } from "@mantine/form";
import { getAuthToken } from '../../utils/auth';
import { requestHandler, useApi } from '../../api/useFetchApi';
import ApiState from '../../interface/api.interface';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { dateConverter } from '../../utils/date';
import AppContext from '../../context/AppContext';

const Task: React.FC = () => {
    const { task } = useParams()
    const { controls, updateTask, addCategory, updateTaskState } = useContext(AppContext)
    const { data, loading, error } = useApi({ method: "get", url: `/task/${task}` }, [])
    let form: UseFormReturnType<{ name: string, description: string, category: string, }> = useForm({
        validate: zodResolver(updateTaskSchema),
        initialValues: {
            name: "",
            description: "",
            category: ""
        },
    });
    useEffect(() => {
       if(data){
         form.setValues({
            name: data?.data?.name,
            description: data?.data?.description,
            category: data?.data?.category?._id
        })
       }
    }, [data])

    return (
        <>
            <div className='task_content'>
                {
                    error === null
                        ?
                        <form onSubmit={form.onSubmit((values) => updateTask(values, task as string))} className="each_task">
                            {
                                !data
                                    ?
                                    <Center sx={{ height: "60vh", position: 'relative' }}>
                                        <Loader color={"violet"} variant={"bars"} size={"xl"} />
                                    </Center>
                                    :
                                    <>
                                        <h3>Starts:{dateConverter(data?.data?.starts)}</h3>
                                        <h3>Ends:{dateConverter(data?.data?.ends)}</h3>
                                        <h1>
                                            <Textarea {...form.getInputProps('name')} autosize />
                                        </h1>
                                        <p className='sub_text'>
                                            <Textarea placeholder='Description' {...form.getInputProps('description')} autosize />
                                        </p>
                                        {/* <Tabs defaultValue="gallery" color={"gray"}>
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
                                            <Textarea size={'md'} autosize placeholder='Write a comment' />
                                            <Button color={"violet"}><RiSendPlane2Fill size={22} /></Button>
                                        </Flex>
                                    </Tabs.Panel>

                                    <Tabs.Panel value="settings" pt="xs">
                                        Settings tab content
                                    </Tabs.Panel>
                                </Tabs> */}
                                        <Select
                                            size={"md"}
                                            placeholder="Category"
                                            {...form.getInputProps('category')}
                                            name={"category"}
                                            searchable
                                            data={controls?.category as SelectItem[]}
                                            creatable
                                            getCreateLabel={(query) => `+ Create ${query}`}
                                            nothingFound={"type to create category"}
                                            onCreate={(query) => addCategory(query)} />


                                        <Button mt={10} color={"violet"} loading={updateTaskState.loading} type={"submit"}>Edit</Button>
                                    </>

                            }

                        </form>
                        :
                        <h2>Network error</h2>
                }
            </div>
        </>
    );
};

export default Task;
