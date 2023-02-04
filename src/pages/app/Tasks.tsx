import { useContext} from 'react';
import { PageHeader, TaskHeader, ToDoList } from '../../components';
import { Center, Loader } from '@mantine/core';
import AppContext from '../../context/AppContext';


const Tasks: React.FC = () => {

    const { controls } = useContext(AppContext)


    return (
        <>
            <>
                <PageHeader emoji={"🚀"} name={"Task"} />
                {
                    !controls?.tasks
                        ?
                        <Center sx={{ height: "60vh", position: 'relative' }}>
                            <Loader color={"violet"} variant={"bars"} size={"xl"} />
                        </Center>
                        :
                        <div className='task_content'>
                            <div className='task_container'>
                                <TaskHeader />
                                {
                                    controls?.tasks.length === 0
                                        ?
                                        <h4>No task available</h4>
                                        :
                                        <ul className={controls?.taskDisplay}>
                                            {
                                                controls?.tasks?.map(({ name, _id, category }) => < ToDoList name={name} id={_id} category={category?.name} />)
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
