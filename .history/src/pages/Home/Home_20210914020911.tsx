import React from 'react';
import { AppBar, FormControl, InputAdornment, InputLabel, OutlinedInput, Toolbar, Typography } from '@material-ui/core';
import {Search} from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      flexGrow: 1,
    },
    form: {
      maxWidth: 700,
      width: "100%",
    },
    outlinedInput: {
      borderColor: "#2500ac"
    },
    search: {
      color: "#847f7f",
    }
  }),
);

export const Home = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography> 
        </Toolbar>
      </AppBar>

      <FormControl className={classes.form} variant="outlined">
        <InputLabel style={{borderColor: "#2f0988"}} htmlFor="outlined-adornment-search">Search</InputLabel>
        <OutlinedInput
          style={{borderColor: "#2f0988"}}
          id="outlined-adornment-search"
          type="search"
          // value={values.password}
          // onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end" style={{borderColor: "#2f0988"}}>
              <Search className={classes.search}/>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    </div>
  )
}