import { PageHeader } from "../../components";
import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { RxCalendar } from "react-icons/rx"
import { Button, Drawer, Tabs } from "@mantine/core";
const Dashboard: React.FC = () => {
    const [value, setValue] = useState<Date | null>(new Date());
    const [drawer, setDrawer] = useState<boolean>(false);
   
    return (
        <>
            <div className='home_content'>
                <PageHeader emoji={"🏠"} name={"Home"} />
                <Drawer
                    opened={drawer}
                    title="Register"
                    onClose={() => setDrawer(false)}
                    padding="xl"
                    size="xl"
                    position="right"
                    overlayOpacity={0}
                >
                     {/* <h1>🤾🏿‍♀️ Play</h1>
                     <p>Go out and play with friends in the rain</p> */}
                     <div>
                            <h2>Nothing to do</h2>
                            <Button>Add to-do</Button>
                     </div>
                </Drawer>
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
                                    <div className="todo_list">
                                        <div className="todos_name">
                                            <h3>🤾🏿‍♀️ Play</h3>
                                            <Button radius={2} variant={"light"} size="xs">Activity</Button>
                                        </div>
                                    </div>
                                    <div className="todo_list">
                                        <div className="todos_name">
                                            <h3>🍽 Eat</h3>
                                            <Button radius={2} color={"orange"} variant={"light"} size="xs">Food</Button>
                                        </div>
                                    </div>
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
                            onChange={(value:Date)=>{
                                setValue(value)
                                setDrawer(true)
                                console.log(value.toLocaleDateString())
                            }}
                            fullWidth
                            size="md"
                            styles={(theme) => ({
                                cell: {
                                    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                                        }`,
                                    height: 45
                                },
                                day: { borderRadius: 0, height: 45, fontSize: theme.fontSizes.md },
                                weekday: { fontSize: theme.fontSizes.md },
                                weekdayCell: {
                                    fontSize: theme.fontSizes.md,
                                    height: 45,
                                    backgroundColor:
                                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                                    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
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
