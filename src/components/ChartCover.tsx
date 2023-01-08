import React from 'react';
import Box from "@mui/material/Box";
import {ComponentWithChildren} from "../types/General";

const ChartCover = ({children}: ComponentWithChildren) => {
    return (
        <Box
            component="div"
            sx={{
                display: 'grid',
                gridAutoRows: 'auto',
                gap: 3,
            }}
        >
            {children}
        </Box>
    );
};

export default ChartCover;