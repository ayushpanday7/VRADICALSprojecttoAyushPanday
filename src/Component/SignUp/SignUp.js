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
import { Encrypt } from '../../EncrypteStorage';
import { useNavigate } from 'react-router-dom';
import coinSet from '../NavBar/coinSet';
const defaultTheme = createTheme();


// this will handle to create new user
export default function SignUp() {


  // setting states
  const navigate = useNavigate();
  const { setCoins } = React.useContext(coinSet);
  const [displayError, setDisplayError] = React.useState('none');
  const [errorValue, setErrorValue] = React.useState('Invelid Form');
  const [username, setUsername] = React.useState('');

  // hendling On Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);


    // when form is invelid Form Submition rejected
    if (data.get('username').length < 4 || data.get('password').length < 8 || data.get('password') !== data.get('conformpwd')) {
      setDisplayError('none')
      setTimeout(() => {
        setDisplayError('flex');
      }, 500);
      return;
    }


    // fetching data from server and validating if user is velid or not
    let response;
    try {
      response = await fetch('http://192.168.0.190/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: data.get('username'), password: data.get('password'), coin: 0 })
      })
      response = await response.json();
      console.log(response);


      // if user already exist
      if (response.code === 0) {
        setErrorValue('user already exist');
        setDisplayError('flex');
      }

      // storing new user Locally
      else {
        Encrypt('username', data.get('username'));
        Encrypt('password', data.get('password'));
        Encrypt('coins', 0);
        Encrypt('carsOwned', []);
        setCoins({ coin: 0, car: [] });
        setDisplayError('none');
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Alert style={{ display: displayError, marginBottom: '0.5rem' }} severity="error">{errorValue}</Alert>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="enter new user name"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => { setUsername(event.target.value.replace(/\s/g, '')) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="conformpwd"
                  label="conform password"
                  type="password"
                  id="conformpwd"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}