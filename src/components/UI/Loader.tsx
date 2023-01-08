import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = (styleProps: {height?: string}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...styleProps}}>
            <CircularProgress />
        </Box>
    );
};

export default Loader;