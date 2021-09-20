import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

export const Home = () => {
  const classes = useStyles();
  return(
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h1" className={classes.title}>
            Home
          </Typography> 
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}