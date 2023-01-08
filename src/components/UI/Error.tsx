import React from 'react';
import Alert from "@mui/material/Alert";

const Error = ({message}: {message: string}) => {
    return (
        <Alert severity="error">{ message }</Alert>
    );
};

export default Error;