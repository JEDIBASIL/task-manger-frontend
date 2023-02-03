import { useContext, useEffect, useState } from 'react';
import { requestHandler, useApi } from '../../api/useFetchApi';
import { PageHeader, TaskHeader, ToDoList } from '../../components';
import { Center, Loader } from '@mantine/core';
import AppContext from '../../context/AppContext';
import ApiState from '../../interface/api.interface';


const Tasks: React.FC = () => {
    const { data, loading, error } = useApi({ method: "get", url: "/task" })
    const [tasks, setTasks] = useState<any[]>([]);
    const [state, setState] = useState<ApiState>({
        data: null,
        loading: false,
        error: null
    });
    const {setControls, controls} = useContext(AppContext)

    useEffect(() => {
        requestHandler(
            {
                method: "get",
                url: `/task`,
            },
            setState
        )
        if (data?.status === "success") {
            setTasks(data?.data?.tasks)
        }
        if(state.data?.status === "success"){
            setTasks(data?.data?.tasks)
        }
    }, [data, loading, error, controls?.monitor])

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
                                {
                                tasks.length === 0
                                ?
                                <h4>No task available</h4>
                                :
                                <ul className={controls?.taskDisplay}>
                                    {
                                        tasks.map(({ name, _id, category }) => < ToDoList name={name} id={_id} category={category?.name} />)
                                    }
                                </ul>
                        }
                            </div>
                        </div>
                }
            </>
        </>
    );
};

export default Tasks;
