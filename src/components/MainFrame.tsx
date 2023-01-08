import React from 'react';
import Box from "@mui/material/Box";
import useMediaQuery from '@mui/material/useMediaQuery';
import {ComponentWithChildren} from "../types/General";

const MainFrame = ({children}: ComponentWithChildren) => {
    const matches = useMediaQuery('(max-width:600px)');

    return (
        <Box
            component="div"
            sx={{
                display: 'grid',
                gridAutoRows: 'auto',
                gap: 3,
                bgcolor: 'background.paper',
                color: 'text.primary',
                textAlign: 'left',
                p: matches? '20px 10px' : '30px',
            }}
        >
            {children}
        </Box>
    );
};

export default MainFrame;