import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import {Search, ReplayRounded, MoreVert, CloseRounded} from '@material-ui/icons';
import { useTableContext } from '../../contexts/TableContext';
import PatientModal, { ModalHandles} from '../../components/Modal/PatientModal';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import {InfiniteScroll} from '../../components/InfiniteScroll/InfiniteScroll'
import { format, parseJSON } from 'date-fns';

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
    date: string;
  }
}

export const Home = () => {
  const classes = useStyles();

  const {patients, isActiveFilterString, isActiveFilterGender, loadingMore, filterByString, handlePatientDetails, getPatientByGender, handleIsActiveFilterString, handleIsActiveFilterGender, clearFilterByGender} = useTableContext()
  const [loading, setLoading] = useState(false)
  const [showChooseGender, setShowChooseGender] = useState(false)
  const modalRef = useRef<ModalHandles>(null)
  
  useEffect(() => {
    setLoading(false)
  }, [patients])
  
  function handleFilterByString(value: string) {  
    handleIsActiveFilterString(true)
    filterByString(value.trim())
  }

  function handleOpenModal(patient: Object) {   
    handlePatientDetails(patient) 
    modalRef.current?.openModal()
  }

  function handleFilterByGender(gender: string){
    handleIsActiveFilterGender(true)
    getPatientByGender(gender)
    setShowChooseGender(false)
  }

  function fetchMore() {
    setLoading(true)
    loadingMore()
  }
  
  return(
    <div className={classes.root}>
      <AppBar className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography> 
        </Toolbar>
      </AppBar>

      <FormControl className={classes.form} variant="outlined">
        <InputLabel className={classes.inputLabel} htmlFor="search">Search</InputLabel>
        <OutlinedInput
          placeholder="Ex: 'Areta' ou 'Areta BR'"
          id="search"
          type="search"
          onChange={(e) => handleFilterByString(e.target.value)}
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
              <TableCell className={`${classes.cellGender} ${classes.cellHeader}`}>
                Gender
                <IconButton 
                  className={classes.buttonMoreVert} 
                  onClick={() => setShowChooseGender(!showChooseGender)}
                >
                  <MoreVert className={classes.moreVert}/>
                </IconButton>
                {isActiveFilterGender && (
                  <IconButton 
                    className={classes.buttonClose} 
                    onClick={clearFilterByGender}
                  >
                    <CloseRounded className={classes.close}/>
                  </IconButton>
                )}
                {showChooseGender && (
                  <div className={classes.chooseGender}>
                    <Button onClick={() => handleFilterByGender("male")}>Male</Button>
                    <Button onClick={() => handleFilterByGender("female")}>Female</Button>
                  </div>
                )}
              </TableCell>
              <TableCell className={classes.cellHeader}>Birth</TableCell>
              <TableCell align="center" className={classes.cellHeader}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient: Patient) => (
              <TableRow key={patient.login.uuid} className={classes.rowBody}>
                <TableCell component="th" className={classes.cellBody}>
                  {patient.name.title}. {patient.name.first} {patient.name.last}
                </TableCell>
                <TableCell className={classes.cellBody}>{patient.gender}</TableCell>
                <TableCell className={classes.cellBody}>
                  {format(parseJSON(patient.dob.date), 'dd-MM-yyyy')}
                </TableCell>
                <TableCell align="center" className={classes.actions}>
                  <Button 
                    variant="contained"  
                    disableElevation 
                    className={classes.buttonShow}
                    onClick={() => handleOpenModal(patient)}
                  >
                    <Link 
                      to={patient?.id?.value ? `/home/patient/${patient?.id?.value}` : "/home/ "}
                      className={classes.link}
                    >show</Link>
                  </Button>
                </TableCell>
              </TableRow>
            )
            )}
          </TableBody>
        </Table>
          {patients.length > 0 && !loading && !isActiveFilterString && !isActiveFilterGender && (
            <InfiniteScroll fetchMore={fetchMore}/>
          )}
      </TableContainer>
      
      {loading && (
        <div className={classes.loading}>
          <ReplayRounded/>
          Loading more
        </div>
      )}
          <PatientModal ref={modalRef}/>

      {/* <Switch>
        <Route path="/:id">
          <PatientModal ref={modalRef}/>
        </Route>
      </Switch> */}
    </div>
  )
}