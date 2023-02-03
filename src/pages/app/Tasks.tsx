import { useContext, useEffect, useState } from 'react';
import { useApi } from '../../api/useFetchApi';
import { PageHeader, TaskHeader, ToDoList } from '../../components';
import { Center, Loader } from '@mantine/core';
import AppContext from '../../context/AppContext';


const Tasks: React.FC = () => {
    const { data, loading, error } = useApi({ method: "get", url: "/task" })
    const [tasks, setTasks] = useState<any[]>([]);
    const {setControls, controls} = useContext(AppContext)

    useEffect(() => {
        if (data?.status === "success") {
            setTasks(data?.data?.tasks)
            console.log(tasks)
        }
    }, [data, loading, error, controls.monitor])

    return (
        <>

            <>
                <PageHeader emoji={"🚀"} name={"Task"} />
                {
                    !data
                        ?
                        <Center sx={{ height: "60vh", position: 'relative' }}>
                            <Loader color={"violet"} variant={"bars"} size={"xl"} />
                        </Center>
                        :
                        <div className='task_content'>
                            <div className='task_container'>
                                <TaskHeader />
                                <ul className={controls?.taskDisplay}>
                                    {
                                        tasks.map(({ name, _id, category }) => < ToDoList name={name} id={_id} category={category?.name} />)
                                    }
                                </ul>
                            </div>
                        </div>
                }
            </>
        </>
    );
};

export default Tasks;
