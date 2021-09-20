import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Home = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography> 
        </Toolbar>
      </AppBar>
      
      <form  noValidate autoComplete="off">
        <TextField id="outlined-search" label="Search field" type="search" variant="outlined" />
      </form>
    </div>
  )
}