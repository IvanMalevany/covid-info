import React from 'react';
import Typography from "@mui/material/Typography";
import {ComponentWithChildren} from "../types/General";

const FormHeader = ({children}: ComponentWithChildren) => {
    return (
        <Typography
            variant="h5"
            component="h2"
            textAlign="center"
        >
            {children}
        </Typography>
    );
};

export default FormHeader;