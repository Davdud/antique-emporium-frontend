import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }));
  

function Login() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
      email: ''
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleFormSubmit = () => {
      fetch("https://antique-emporium-backend.herokuapp.com/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
    }).then(function(res) {
        return res.json()
    }).then(function(data) {
      if(data.status == "OK") {
        localStorage.setItem("token", data.data)
        alert("Login was succusfull!");
        window.location.replace("/");
      } else {
        alert("Your credentials were wrong :(. Please try again!")
        window.location.reload();
      }
    }).catch(function(error) {
        console.error(error)
    })
    }
  return (
    <>
      <div className="login">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField type="email" id="input-with-icon-grid" onChange={handleChange('email')} name="email" label="Email:" placeholder="Email" required name="email" />
          </Grid>
        </Grid>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password:</InputLabel>
          <Input
          placeholder="Password"
          name="password"
          required
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      <div className="wrap">
  <button onClick={handleFormSubmit} type="submit" className="button">Log in</button>
</div>
</div>
</>
  );
}
export default Login;