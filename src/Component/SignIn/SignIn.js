// the design is Copied from Google Material UI (MUI)
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { Decrypt, Encrypt } from '../../EncrypteStorage';
import coinSet from '../NavBar/coinSet';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();


// this will handle user signin
export default function SignIn() {


  // setting states
  const navigate = useNavigate(); // this help to redirect to different pages
  const { setCoins } = React.useContext(coinSet);
  const [displayError, setDisplayError] = React.useState('none');


  // this will redirect to deshboard when user already logined
  // I can improve it if I could have more time
  React.useEffect(() => {
    Decrypt('username').then((item) => {
      if (item !== null) {
        navigate('/');
      }
    })
  })


  // hendling On Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // when form is invelid Form Submition rejected
    if (data.get('username').length < 4 || data.get('password').length < 8) {
      setDisplayError('none')
      setTimeout(() => {
        setDisplayError('flex');
      }, 500);
      return;
    }


    // fetching data from server and validating if user is velid or not
    let response;
    try {
      response = await fetch('http://192.168.0.190/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: data.get('username'), password: data.get('password') })
      })
      response = await response.json();


      // if user does not exist then
      if (response.code === 0) {
        setDisplayError('none')
        setTimeout(() => {
          setDisplayError('flex');
        }, 500);
      }


      // if user exist then save data and continue
      else {
        Encrypt('username', data.get('username'));
        Encrypt('password', data.get('password'));
        Encrypt('coins', response.coin);
        Encrypt('carsOwned', response.car);
        setDisplayError('none');
        console.log(response);
        setCoins({ coin: response.coin, car: response.car });
        navigate('/Shop')
      }
    }
    catch (error) {
      console.log(error);
    }
  };


  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Alert style={{ display: displayError }} severity="error">No user found</Alert>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
