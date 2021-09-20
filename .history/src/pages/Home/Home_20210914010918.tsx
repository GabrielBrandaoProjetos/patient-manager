import React from 'react';
import { AppBar, FormControl, InputAdornment, InputLabel, OutlinedInput, Toolbar, Typography } from '@material-ui/core';
import Search from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      marginBottom: 50,
    },
    title: {
      flexGrow: 1,
    },
    search: {
      maxWidth: 700,
      width: 700,
    }
  }),
);

export const Home = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography> 
        </Toolbar>
      </AppBar>

      <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="search"
            // value={values.password}
            // onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <Search/>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      
      {/* <form  noValidate autoComplete="off">
        <TextField className={classes.search} id="outlined-search" label="Search" type="search" variant="outlined"/>
      </form> */}
    </div>
  )
}