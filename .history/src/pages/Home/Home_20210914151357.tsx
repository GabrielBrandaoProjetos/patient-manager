import React from 'react';
import { AppBar, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import {Search, ReplayRounded} from '@material-ui/icons';
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
      
    },
    search: {
      color: "#d2d2d2",
    },
    tableContainer: {
      maxWidth: 700,
      width: "100%",

      marginTop: 30,
      backgroundColor: "#4f5052",
    },
    table: {

    },
    row: {
      color: "white",
      background: "#3f51b5"
    },
    rowBody: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#78797a",
      }
    },
    cell: {
      color: "white",
    },
    actions: {
      padding: 0
    },
    button: {
      padding: "4px 16px",
      textTransform: "none"
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
        <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
        <OutlinedInput
          classes={{root: classes.outlinedInput}}
          id="outlined-adornment-search"
          type="search"
          // value={values.password}
          // onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <Search className={classes.search}/>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>Name</TableCell>
              <TableCell className={classes.cell}>Gender</TableCell>
              <TableCell className={classes.cell}>Birth</TableCell>
              <TableCell align="center" className={classes.cell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow className={classes.rowBody}>
              <TableCell component="th" className={classes.cell}>Gabriel Brandão</TableCell>
              <TableCell className={classes.cell}>masculino</TableCell>
              <TableCell className={classes.cell}>26</TableCell>
              <TableCell align="center" className={classes.actions}>
                <Button variant="contained" color="primary" disableElevation className={classes.button}>Show</Button>
              </TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>
      <Button>
        <ReplayRounded/>
        Loading more
      </Button>
    </div>
  )
}