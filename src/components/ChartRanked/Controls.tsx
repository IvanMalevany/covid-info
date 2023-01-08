import React from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {TwoWaySwitch} from "../UI/TwoWaySwitch";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";

interface ControlsParams {
    paramType: string;
    onParamTypeChange: () => void;
    topCountries: string;
    onChangeTopCountries: (event: SelectChangeEvent) => void;
}

const Controls = ({paramType, onParamTypeChange, topCountries, onChangeTopCountries}: ControlsParams) => {
    return (
        <FormGroup sx={{gap: 3}}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Total confirmed cases</Typography>
                <TwoWaySwitch
                    inputProps={{ 'aria-label': 'Two way switch' }}
                    checked={paramType === 'total_deaths'}
                    onChange={onParamTypeChange}
                />
                <Typography>Total death</Typography>
            </Stack>

            <FormControl fullWidth>
                <InputLabel>Top countries</InputLabel>
                <Select
                    labelId="top-countries-label"
                    value={topCountries}
                    label="Top counties"
                    onChange={onChangeTopCountries}
                >
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </FormControl>
        </FormGroup>
    );
};

export default Controls;