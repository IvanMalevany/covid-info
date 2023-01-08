import React, {MouseEvent} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Tab, TabsProps} from "../types/Tabs";

const Tabs = (props: TabsProps) => {
    return (
        <ToggleButtonGroup
            color="primary"
            value={props.active}
            exclusive
            onChange={(e: MouseEvent<HTMLElement>, newType: Tab) => props.setActive(newType)}
            aria-label="Report"
            fullWidth
        >
            <ToggleButton value="reported_cases">Reported cases</ToggleButton>
            <ToggleButton value="ranked_charts">Ranked charts</ToggleButton>
        </ToggleButtonGroup>
    );
};

export default Tabs;