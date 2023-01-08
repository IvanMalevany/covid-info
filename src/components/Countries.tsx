import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {CountriesProps, SelectedCountry} from "../types/Country";

const Countries = (props: CountriesProps) => {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={props.countriesList}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => value.label === option.label}
            renderInput={(params) => <TextField {...params} label="Select country" />}
            value={props.selectedCountry}
            onChange={(event: any, newValue: SelectedCountry) => props.setSelectedCountry(newValue)}
        />
    );
};

export default Countries;