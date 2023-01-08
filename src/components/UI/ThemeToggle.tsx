import React, {useContext} from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import {useTheme} from "@mui/material/styles";
import {ColorModeContext} from "../../context/ColorModeContext";

const ThemeToggle = () => {
    const AppTheme = useTheme();
    const colorMode = useContext(ColorModeContext)

    return (
        <FormGroup sx={{ alignItems: 'end', pb: '20px' }}>
            <FormControlLabel
                control={
                    <Switch
                        checked={AppTheme.palette.mode === 'dark'}
                        onChange={colorMode.toggleColorMode}
                        color="secondary"
                    />
                }
                label={AppTheme.palette.mode === 'dark'? 'Dark mode' : 'Light mode'}
            />
        </FormGroup>
    );
};

export default ThemeToggle;