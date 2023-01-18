import "./styles/global.css";
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import theme from './theme'
import AppRoutes from './navigation/AppRoutes'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
      <ToastContainer />
    </ThemeProvider>

  )
}
