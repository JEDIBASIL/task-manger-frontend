import { PageHeader } from "../../components";
import { useContext, useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Badge, Tabs } from "@mantine/core";
import AppContext, { AppContextControls } from "../../context/AppContext";
const Dashboard: React.FC = () => {
    const [value, setValue] = useState<Date | null>(new Date());
    const { setControls, controls } = useContext(AppContext)

    return (
        <>
            <div className='home_content'>
                <PageHeader emoji={"🏠"} name={"Home"} />

                <div className="content">
                    <div className="content_box">
                        <Tabs
                            defaultValue="gallery">
                            <Tabs.List>
                                <Tabs.Tab value="gallery"><h3 className="tab_header">To do</h3></Tabs.Tab>
                                <Tabs.Tab value="messages"><h3 className="tab_header">Comments</h3></Tabs.Tab>
                                <Tabs.Tab value="settings"><h3 className="tab_header">Upcoming</h3></Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="gallery" pt="xs">
                                <div className="tab_panel">
                                    {
                                        controls?.tasks?.map(({ name, _id, category }) =>
                                            <div className="todo_list">
                                                <div className="todos_name" key={_id}>
                                                    <h3>{name}</h3>
                                                    <Badge radius={50} color={"orange"} variant={"light"} size="xs">{category?.name}</Badge>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            </Tabs.Panel>

                            <Tabs.Panel value="messages" pt="xs">
                                Messages tab content
                            </Tabs.Panel>

                            <Tabs.Panel value="settings" pt="xs">
                                Settings tab content
                            </Tabs.Panel>
                        </Tabs>
                    </div>

                    <div className="content_box">
                        <h2>🗓 Calendar</h2>
                        <Calendar
                            value={value}
                            onChange={(value: Date) => {
                                setValue(value)
                                setControls({ ...controls, calendarDrawer: true, calendarHeader: value } as AppContextControls)
                            }}
                            fullWidth
                            size="md"
                            styles={(theme) => ({
                                cell: {
                                    height: 45,
                                },
                                day: { borderRadius: 50, height: 45, fontSize: theme.fontSizes.md },
                                weekday: { fontSize: theme.fontSizes.md },
                                weekdayCell: {
                                    fontSize: theme.fontSizes.md,
                                    height: 45,
                                    backgroundColor:
                                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                                    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                                        }`,
                                    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                                        }`,
                                },
                            })}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;



