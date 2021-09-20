import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, IconButton, Button, TableBody } from "@material-ui/core"
import { MoreVert, CloseRounded, ReplayRounded } from "@material-ui/icons"
import { format, parseJSON } from "date-fns"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll"
import { ModalHandles} from '../../components/Modal/PatientModal';
import { useTableContext } from "../../contexts/TableContext"
import { Location } from 'history' 

import { useStyles } from "./TablePatients.style"


export const TablePatients = () => {
  const classes = useStyles();
  const location = useLocation<Location>();
  
  const {
    patients, 
    isActiveFilterString, 
    isActiveFilterGender, 
    loadingMore, 
    handlePatientDetails, 
    getPatientByGender, 
    handleIsActiveFilterGender, 
    clearFilterByGender
  } = useTableContext()
  const [showChooseGender, setShowChooseGender] = useState(false)
  const [loading, setLoading] = useState(false)
  const modalRef = useRef<ModalHandles>(null)

  useEffect(() => {
    setLoading(false)
  }, [patients])
  
  function handleFilterByGender(gender: string){
    handleIsActiveFilterGender(true)
    getPatientByGender(gender)
    setShowChooseGender(false)
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
    <>
    {patients.length < 1 && !isActiveFilterString && !isActiveFilterGender ? (
      <h1>Loading...</h1>
    ) : (

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell className={classes.cellHeader}>#</TableCell>
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
            {patients.map((patient, index) => (
              <TableRow key={patient.login.uuid} className={classes.rowBody}>
                <TableCell className={classes.cellBody}>{index + 1}</TableCell>
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
                      to={{
                        pathname: patient?.id?.value ? patient?.id?.value : "/ ",
                        state: {background: location}
                      }}

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
    )}

      {loading && (
        <div className={classes.loading}>
          <ReplayRounded/>
          Loading more
        </div>
      )}
    </>
  )
}