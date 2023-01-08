import React, {useMemo} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import getDesignTokens from "./theme";
import {PaletteMode} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ColorModeContext} from "./context/ColorModeContext";
import Main from "./pages/Main";

function App() {
  const [mode, setMode] = React.useState<PaletteMode>(process.env.REACT_APP_DEFAULT_THEME as 'light' | 'dark');
  const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode: PaletteMode) =>
              prevMode === 'light' ? 'dark' : 'light',
          );
        },
      }),
      [],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Main/>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
