import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, Typography } from '@material-ui/core';
import {Search, ReplayRounded, MoreVert} from '@material-ui/icons';
import { useTableContext } from '../../contexts/TableContext';
import PatientModal, { ModalHandles} from '../../components/Modal/PatientModal';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import {InfiniteScroll} from '../../components/InfiniteScroll/InfiniteScroll'

import { useStyles } from './Home.style';


interface Patient {
  id:{
    value: string;
  }
  login:{
    uuid: string;
  }
  name: {
    title: string;
    first: string;
    last: string;
  }
  gender: string;
  dob: {
    age: number;
  }
}

export const Home = () => {
  const classes = useStyles();

  const {patients, resultSearch, loadingMore, filterByString, handlePatientDetails} = useTableContext()
  const [loading, setLoading] = useState(false)
  const modalRef = useRef<ModalHandles>(null)
  
  useEffect(() => {
    setLoading(false)
  }, [patients])
  
  function handleChange(value: string) {    
    filterByString(value.trim())
  }

  function handleOpenModal(patient: Object) {   
    handlePatientDetails(patient) 
    modalRef.current?.openModal()
  }

  function fetchMore() {
    setLoading(true)
    loadingMore()
  }
  
  return(
    <Router>
    <div className={classes.root}>
      <AppBar className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography> 
        </Toolbar>
      </AppBar>

      <FormControl className={classes.form} variant="outlined">
        <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-search">Search</InputLabel>
        <OutlinedInput
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
              <TableCell className={classes.cellHeader}>
                Gender
                <IconButton aria-label="morevert">
                  <MoreVert />
                </IconButton>
                <TableSortLabel
                  // active={orderBy === headCell.id}
                  // direction={orderBy === headCell.id ? order : 'asc'}
                  // onClick={createSortHandler(headCell.id)}
                >
                  
                    <Box component="span">
                    </Box>
                </TableSortLabel>
                
              </TableCell>
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
                  <TableCell className={classes.cellBody}>{patient.dob.age}</TableCell>
                  <TableCell align="center" className={classes.actions}>
                  <Button 
                        variant="contained"  
                        disableElevation 
                        className={classes.buttonShow}
                        onClick={() => handleOpenModal(patient)}
                      >
                        <Link 
                          to={patient?.id?.value ? patient?.id?.value: "/ "}
                          className={classes.link}
                        >show</Link>
                      </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              patients.map((patient: Patient) => {
                return (
                  <TableRow key={patient.login.uuid} className={classes.rowBody}>
                    <TableCell component="th" className={classes.cellBody}>
                      {patient.name.title}. {patient.name.first} {patient.name.last}
                    </TableCell>
                    <TableCell className={classes.cellBody}>{patient.gender}</TableCell>
                    <TableCell className={classes.cellBody}>{patient.dob.age}</TableCell>
                    <TableCell align="center" className={classes.actions}>
                        <Button 
                          variant="contained"  
                          disableElevation 
                          className={classes.buttonShow}
                          onClick={() => handleOpenModal(patient)}
                        >
                          <Link 
                            to={patient?.id?.value ? patient?.id?.value: "/ "}
                            className={classes.link}
                          >show</Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}       
          </TableBody>
        </Table>
          {patients.length > 0 && !loading && resultSearch.length === 0 && (
            <InfiniteScroll fetchMore={fetchMore}/>
          )}
      </TableContainer>
      
      {loading && (
        <div className={classes.loading}>
          <ReplayRounded/>
          Loading more
        </div>
      )}

      <Switch>
        <Route path="/:id">
          <PatientModal ref={modalRef}/>
        </Route>
      </Switch>
    </div>
    </Router>
  )
}