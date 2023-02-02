import { Button } from '@mantine/core';
import React, { useContext } from 'react';
import AppContext, { AppContextControls } from '../../context/AppContext';

interface AddTaskBtnProps {
}

const AddTaskBtn: React.FC<AddTaskBtnProps> = ({ }) => {
    const { setControls, controls } = useContext(AppContext)

    return (
        <>
            <div className="add_task_btn">
                <Button onClick={() => setControls({ ...controls, addTaskDrawer: true } as AppContextControls)} radius={50} color={"violet"}><h4>🎯 Add task</h4></Button>
            </div>
        </>
    );
};

export default AddTaskBtn;
