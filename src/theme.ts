import {PaletteMode} from "@mui/material";
import {ThemeOptions} from "@mui/material/styles/createTheme";

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    shape: {
        borderRadius: 5
    },
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#000',
                    light: '#000',
                    dark: '#002884',
                    contrastText: '#fff',
                },
                secondary: {
                    main: '#002884'
                },
                background: {
                    default: '#ddd',
                    paper: '#fff',
                },
                text: {
                    primary: '#222',
                    secondary: '#444',
                },
            }
            : {
                primary: {
                    main: '#fff',
                    light: '#757ce8',
                    dark: '#002884',
                    contrastText: '#fff',
                },
                secondary: {
                    main: '#58a6ff',
                },
                background: {
                    default: '#0d1117',
                    paper: '#161b22',
                },
                text: {
                    primary: '#c9d1d9',
                    secondary: '#8b949e',
                },
            }),
    },
});

export default getDesignTokens