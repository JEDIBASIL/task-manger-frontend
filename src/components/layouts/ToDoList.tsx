import { Menu, Button, Text, ActionIcon, Avatar, Tooltip } from '@mantine/core';
import { IconSettings, IconMessageCircle, IconPhoto, IconSearch, IconArrowsLeftRight, IconTrash } from '@tabler/icons';
import React from 'react';
import { CiCircleMore } from 'react-icons/ci';


const ToDoList: React.FC = () => {
    return (
        <>
            <li>
                <h3>🤾🏿‍♀️ Play</h3>
                <Avatar.Group  spacing="sm">
                    <Tooltip label={"John"}>
                    <Avatar size={"md"} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" radius="xl" />
                    </Tooltip>
                    <Avatar size={"md"} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" radius="xl" />
                    <Avatar size={"md"} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" radius="xl" />
                </Avatar.Group>
                <div>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon><CiCircleMore size={22} /></ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Application</Menu.Label>
                            <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                            <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                            <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                            <Menu.Item
                                icon={<IconSearch size={14} />}
                                rightSection={<><Text size="xs" color="dimmed">⌘K</Text></>}
                            >
                                Search
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
                            <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete my account</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </li>
        </>
    );
};

export default ToDoList;
