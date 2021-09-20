import React from 'react';
import { AppBar, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import {Search, ReplayRounded} from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTableContext } from '../../contexts/TableContext';

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
      marginTop: 94,
      padding: "0 16px"
    },
    inputLabel: {
      color: "#d2d2d2"
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
      marginBottom: 20,
      backgroundColor: "#707070",
    },
    row: {
      color: "white",
      background: "#3f51b5",
    },
    rowBody: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#515151",
      }
    },
    cellHeader: {
      color: "white",
      fontWeight: "bold",
    },
    cellBody: {
      color: "white",
    },
    actions: {
      padding: 0
    },
    buttonShow: {
      padding: "4px 16px",
      textTransform: "none"
    },
    buttonLoading: {
      color: "#78797a",
    },
  }),
);

interface Patient {
  login:{
    uuid: string;
  }
  name: {
    title: string;
    first: string;
    last: string;
  }
  gender: string;
  registered: {
    age: number;
  }
}

export const Home = () => {
  const classes = useStyles();

  const {patients, resultSearch, loadingMore, filterByString} = useTableContext()

  function handleChange(value: string) {    
    filterByString(value.trim())
  }
  
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
        <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-search">Search</InputLabel>
        <OutlinedInput
          classes={{root: classes.outlinedInput}}
          id="outlined-adornment-search"
          type="search"
          onChange={(e) => handleChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Search className={classes.search}/>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell className={classes.cellHeader}>Name</TableCell>
              <TableCell className={classes.cellHeader}>Gender</TableCell>
              <TableCell className={classes.cellHeader}>Birth</TableCell>
              <TableCell align="center" className={classes.cellHeader}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultSearch.length > 0 ? (
              resultSearch.map((patient: Patient) => (
                <TableRow key={patient.login.uuid} className={classes.rowBody}>
                  <TableCell component="th" className={classes.cellBody}>
                    {patient.name.title}. {patient.name.first} {patient.name.last}
                  </TableCell>
                  <TableCell className={classes.cellBody}>{patient.gender}</TableCell>
                  <TableCell className={classes.cellBody}>{patient.registered.age}</TableCell>
                  <TableCell align="center" className={classes.actions}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      disableElevation 
                      className={classes.buttonShow}
                    >
                      show
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              patients.map((patient: Patient) => (
                <TableRow key={patient.login.uuid} className={classes.rowBody}>
                  <TableCell component="th" className={classes.cellBody}>
                    {patient.name.title}. {patient.name.first} {patient.name.last}
                  </TableCell>
                  <TableCell className={classes.cellBody}>{patient.gender}</TableCell>
                  <TableCell className={classes.cellBody}>{patient.registered.age}</TableCell>
                  <TableCell align="center" className={classes.actions}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      disableElevation 
                      className={classes.buttonShow}
                    >
                      show
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}          
          </TableBody>
        </Table>
      </TableContainer>

      <Button 
        className={classes.buttonLoading} 
        startIcon={<ReplayRounded/>}
        onClick={loadingMore}
      >
        Loading more
      </Button>
    </div>
  )
}