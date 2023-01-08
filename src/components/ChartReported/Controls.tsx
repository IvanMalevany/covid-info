import React, {FC} from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {TwoWaySwitch} from "../UI/TwoWaySwitch";
import FormGroup from "@mui/material/FormGroup";

interface ControlsParams {
    paramType: string;
    onParamTypeChange: () => void;
    countType: string;
    onCountTypeChange: () => void;
}

const Controls: FC<ControlsParams> = ({paramType, onParamTypeChange, countType, onCountTypeChange}) => {
    return (
        <FormGroup sx={{gap: 2}}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Confirmed cases</Typography>
                <TwoWaySwitch
                    inputProps={{ 'aria-label': 'Two way switch' }}
                    checked={paramType === 'deaths'}
                    onChange={onParamTypeChange}
                />
                <Typography>Death count</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>New values</Typography>
                <TwoWaySwitch
                    inputProps={{ 'aria-label': 'Two way switch' }}
                    checked={countType === 'total'}
                    onChange={onCountTypeChange}
                />
                <Typography>Cumulative mode</Typography>
            </Stack>
        </FormGroup>
    );
};

export default Controls;