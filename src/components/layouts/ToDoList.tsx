import { Menu, Text, ActionIcon, Avatar, Tooltip, Badge } from '@mantine/core';
import { IconSettings, IconMessageCircle, IconPhoto, IconSearch, IconArrowsLeftRight, IconTrash, IconEdit } from '@tabler/icons';
import { error } from 'console';
import React, { useEffect, useState } from 'react';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { requestHandler } from '../../api/useFetchApi';
import ApiState from '../../interface/api.interface';
import { showNotification } from '@mantine/notifications';

interface ToDoListProps {
    name: string
    id: string
    category: string
}

const ToDoList: React.FC<ToDoListProps> = ({ name, id, category }) => {

    const [state, setState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });

    useEffect(() => {
        console.log(state)
        if (state.data?.status === "success") {
            showNotification({
                title: "Successful",
                message: "task deleted"
            })
        }

        if (state.error?.status === 500) {
            showNotification({
                title: "Failed",
                message: "an error occurred",
                color: "red"
            })
        }

        if (state.error?.status === 404) {
            showNotification({
                title: "Failed",
                message: "task not found",
                color: "red"
            })
        }
        

    }, [state])

    const deleteTask = (id: string) => {
        requestHandler(
            {
                method: "delete",
                url: "/task",
                data: { id }
            },
            setState
        )
    }


    return (
        <>
            <li>
                <Link to={`/app/task/${id}`}><h3>{name}</h3></Link>

                <Avatar.Group spacing="sm">
                    <Tooltip label={"John"}>
                        <Avatar size={"md"} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" radius="xl" />
                    </Tooltip>
                    <Avatar size={"md"} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" radius="xl" />
                    <Avatar size={"md"} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" radius="xl" />
                </Avatar.Group>
                <div className='todos_category'>
                    <Badge radius={50} color={"orange"} variant={"light"} size="xs">{category}</Badge>
                </div>
                <div>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon className='more'><CiCircleMore size={22} /></ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Edit</Menu.Label>
                            <Link to={`/app/task/${id}`}>
                                <Menu.Item icon={<IconEdit size={14} />}>
                                    Edit task
                                </Menu.Item>
                            </Link>
                            <Menu.Divider />
                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item onClick={()=>{
                                console.log(id)
                                deleteTask(id)}} color="red" icon={<IconTrash size={14} />}>Delete task</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </li>
        </>
    );
};

export default ToDoList;
