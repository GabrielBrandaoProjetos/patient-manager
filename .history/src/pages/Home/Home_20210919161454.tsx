import React, { useRef } from 'react';
import { AppBar, FormControl, InputAdornment, InputLabel, OutlinedInput, Toolbar, Typography } from '@material-ui/core';
import {Search} from '@material-ui/icons';
import { useTableContext } from '../../contexts/TableContext';
import PatientModal, { ModalHandles} from '../../components/Modal/PatientModal';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { TablePatients } from '../../components/TablePatients/TablePatients';

import { useStyles } from './Home.style';

export const Home = () => {
  const classes = useStyles();

  const { filterByString, handleIsActiveFilterString } = useTableContext()
  const modalRef = useRef<ModalHandles>(null)
  const timeoutRef = useRef<any>(null)
  
  function handleFilterByString(value: string) { 
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      handleIsActiveFilterString(true)
      filterByString(value.trim())
    }, 500) 
  }
  
  return(
    // <Router>
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
      
      <TablePatients/>

      {/* <Switch>
        <Route path="/:id">
          <PatientModal ref={modalRef}/>
        </Route>
      </Switch> */}
    </div>
    
  )
}