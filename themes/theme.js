import { createTheme, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const theme = createTheme({
  
  overrides: {
    
    MuiInputLabel: {
      root: {
        color: "white",
      },
    },
  },
  palette: {
    text: {
      primary: '#ffffff', 
    },
    background: {
      default: '#000000', // Set the default background color to black
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    // Override font color
    body1: {
      color: 'white',
    },
  },
  components: {
     MuiAppBar: {
      
      styleOverrides: {
        root: {
          background: 'linear-gradient(to left, #b716d8, #d126b0)'
        },
      },
      
    },

    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d0b0a', // Set your desired background color here
        },
      },
    },
 
  
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#171717',
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'white', // Set the color of the focused small label
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '0px',
            '& fieldset': {
               
            },
            '&:hover fieldset': {
              borderRadius: '10px',
              borderImage: 'linear-gradient(to left, #b716d8, #d126b0) 1', 
              borderImageSlice: '1',
              
            },
            '&:focus-within fieldset': {
              
              borderImage: 'linear-gradient(to left, #b716d8, #d126b0) 1', 
              borderImageSlice: '1',            },
          },
        },
      },
    },
  },
});

const CustomTextField = styled(TextField)({
  // Add any additional styles for the TextField component here
});

export default theme;
export { CustomTextField };
