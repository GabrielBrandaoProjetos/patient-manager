import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, IconButton, Button, TableBody } from "@material-ui/core"
import { MoreVert, CloseRounded } from "@material-ui/icons"
import { parseJSON } from "date-fns"
import { format } from "path"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll"
const {patients, isActiveFilterString, isActiveFilterGender, loadingMore, filterByString, handlePatientDetails, getPatientByGender, handleIsActiveFilterString, handleIsActiveFilterGender, clearFilterByGender} = useTableContext()
import { format, parseJSON } from 'date-fns';
import {InfiniteScroll} from '../../components/InfiniteScroll/InfiniteScroll'
import PatientModal, { ModalHandles} from '../../components/Modal/PatientModal';

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

export const TablePatients = () => {
  const classes = useStyles();

  const [showChooseGender, setShowChooseGender] = useState(false)
  const [loading, setLoading] = useState(false)
  const modalRef = useRef<ModalHandles>(null)
  
  function handleFilterByGender(gender: string){
    handleIsActiveFilterGender(true)
    getPatientByGender(gender)
    setShowChooseGender(false)
  }

  function handleOpenModal(patient: Object) {   
    handlePatientDetails(patient) 
    modalRef.current?.openModal()
  }

  return(
    <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
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
                      to={patient?.id?.value ? patient?.id?.value : "/ "}
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
  )
}