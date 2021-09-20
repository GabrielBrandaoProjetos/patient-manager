import React, { useRef } from 'react';
import { AppBar, FormControl, InputAdornment, InputLabel, OutlinedInput, Toolbar, Typography } from '@material-ui/core';
import {Search} from '@material-ui/icons';
import { useTableContext } from '../../contexts/TableContext';
import { TablePatients } from '../../components/TablePatients/TablePatients';

import { useStyles } from './Home.style';

export const Home = () => {
  const classes = useStyles();

  const { 
    patients, 
    isActiveFilterString, 
    isActiveFilterGender, 
    filterByString,
    filterByStringAndNat,
    handleIsActiveFilterString
  } = useTableContext()

  const timeoutRef = useRef<any>(null)
  
  function handleFilterByString(value: string) {
    clearTimeout(timeoutRef.current)
    
    const [str, nat] = value.trim().split(" ")

    timeoutRef.current = setTimeout(() => {
      handleIsActiveFilterString(true)
      if(nat){
        filterByStringAndNat(str, nat)
      }else{
        filterByString(str)
      }
    }, 500) 
  }
  
  return(
    <div className={classes.root}>
      {patients.length < 1 && !isActiveFilterString && !isActiveFilterGender ? (
        <h1>Loading...</h1>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}