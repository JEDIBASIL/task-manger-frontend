import { PageHeader } from "../../components";
import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { RxCalendar } from "react-icons/rx"
const Dashboard: React.FC = () => {
    const [value, setValue] = useState<Date | null>(new Date());


    return (
        <>
            <div className='home_content'>
                <PageHeader emoji={"🏠"} name={"Home"} />
                <div className="content">
                    <div className="content_box">
                        <h3>Ongoing Task</h3>
                    </div>

                    <div className="content_box">
                        <h2><RxCalendar />Calendar</h2>
                        <Calendar
                            value={value}
                            onChange={setValue}
                            fullWidth
                            size="lg"
                            styles={(theme) => ({
                                cell: {
                                    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                                        }`,
                                },
                                day: { borderRadius: 0, height: 55, fontSize: theme.fontSizes.md },
                                weekday: { fontSize: theme.fontSizes.lg },
                                weekdayCell: {
                                    fontSize: theme.fontSizes.xl,
                                    backgroundColor:
                                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                                    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                                        }`,
                                    height: 55,
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
