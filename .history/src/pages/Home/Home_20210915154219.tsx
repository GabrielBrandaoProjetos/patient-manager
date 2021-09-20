import React, { useRef, useState } from 'react';
import { AppBar, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import {Search, ReplayRounded} from '@material-ui/icons';
import { useTableContext } from '../../contexts/TableContext';
import PatientModal, { ModalHandles} from '../../components/Modal/PatientModal';

import { useStyles } from './Home.style';


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
  const modalRef = useRef<ModalHandles>(null)

  function handleChange(value: string) {    
    filterByString(value.trim())
  }

  function handleOpenModal() {    
    modalRef.current?.openModal()
  }
  
  return(
    <div className={classes.root}>
      {/* <PatientModal patient="gabriel" ref={modalRef}/> */}
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
                      onClick={() => {
                        handleOpenModal()
                        <PatientModal patient="gabriel" ref={modalRef}/>

                      }}
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
                      onClick={handleOpenModal}
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