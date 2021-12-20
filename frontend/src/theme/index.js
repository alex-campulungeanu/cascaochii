import { createTheme} from '@mui/material/styles';
import * as Colors from '@mui/material/colors'

const theme = createTheme({
  palette: {
    text: Colors.blue,
    primary: {
      main: '#24778c',
      // darker: '#053e85',
    },
    secondary: {
      main: '#5e914c',
      // darker: '#053e85',
    },
    alternateTextColor: Colors.red
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#F3F4F6',
          '.MuiTableCell-root': {
            color: '#374151'
          },
          borderBottom: 'none',
          '& .MuiTableCell-root': {
            borderBottom: 'none',
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase'
          },
          '& .MuiTableCell-paddingCheckbox': {
            paddingTop: 4,
            paddingBottom: 4
          }
        }
      }
    }
  }
});

export default theme