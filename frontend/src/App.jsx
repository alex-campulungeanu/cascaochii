import "./styles/global.css";
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme'
import AppRoutes from './navigation/AppRoutes'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>

  )
}
