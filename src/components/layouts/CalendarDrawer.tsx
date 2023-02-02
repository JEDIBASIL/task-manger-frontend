import { Drawer, Button } from '@mantine/core';
import React, { useContext, useState } from 'react';
import AppContext, { AppContextControls } from '../../context/AppContex';
import { dateConverter } from '../../utils/date';

interface CalendarDrawerProps {

}

const CalendarDrawer: React.FC<CalendarDrawerProps> = ({ }) => {
    const {setControls,controls} = useContext(AppContext)

    return (
        <>
            <Drawer
                opened={controls?.calendarDrawer as boolean}
                title={<h1>{"⏰ "+ dateConverter(controls?.calendarHeader)}</h1>}
                onClose={() => setControls({...controls,calendarDrawer:false} as AppContextControls)}
                padding="xl"
                size="xl"
                position="right"
                overlayOpacity={0}
            >
                <div>
                    
                </div>
            </Drawer>
        </>
    );
};

export default CalendarDrawer;
