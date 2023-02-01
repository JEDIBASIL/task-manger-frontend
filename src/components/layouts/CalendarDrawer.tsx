import { Drawer, Button } from '@mantine/core';
import React, { useState } from 'react';

interface CalendarDrawerProps {

}

const CalendarDrawer: React.FC<CalendarDrawerProps> = ({ }) => {
    const [drawer, setDrawer] = useState<boolean>(true);

    return (
        <>
            <Drawer
                opened={drawer}
                title="Register"
                onClose={() => setDrawer(false)}
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
