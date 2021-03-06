import { createContext, useContext, useEffect, useState } from "react";
import { searchPatients } from "../services/api";

interface Patient {
  id?:{
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
  email: string;
  gender: string;
  dob: {
    date: string;
  }
  nat: string
  picture: {
    large: string;
  }
  location: {
    street: {
      name: string;
      number: number;
    }
    city: string;
    state: string;
    country: string;
    postcode: number;
  }
  phone: string;
  cell: string;
}

interface TableContextData{
	patients: Patient[]
  patientDetails: Patient
  isActiveFilterString: boolean
  isActiveFilterGender: boolean
  loadingMore: () => void
  filterByString: (value: string) => void
  filterByStringAndNat: (str: string, nat: string) => void
  handlePatientDetails: (patient: Object) => void
  getPatientByID: (id: string) => void
  getPatientByGender: (gender: string) => void
  handleIsActiveFilterString: (value: boolean) => void
  handleIsActiveFilterGender: (value: boolean) => void
  clearFilterByGender: () => void
}

const TableContext = createContext<TableContextData>({} as TableContextData)

export const TableProvider: React.FC = ({children}) => {
  const [data, setData] = useState<Patient[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [patientDetails, setPatientDetails] = useState<any>(null)
  const [patientsFilteredByString, setPatientsFilteredByString] = useState<any[]>([])
  const [patientsFilteredByGender, setPatientsFilteredByGender] = useState<any[]>([])
  const [isActiveFilterString, setIsActiveFilterString] = useState(false)
  const [isActiveFilterGender, setIsActiveFilterGender] = useState(false)
  const [page, setPage] = useState(1)
  
  useEffect(() => {    
    handleSearchPatients()
  }, [])

  async function handleSearchPatients() {
    const {results, info} = await searchPatients(page)
    setPatients(results) 
    setData(results) 
    setPage(info.page)
  }
  
  async function loadingMore() {  
    const {results, info} = await searchPatients(page+1)
    
    setPatients([...data, ...results])
    setData([...data, ...results])
    setPage(info.page)
  }

  function filterByString(value: string) {
    if(value){
      if(patientsFilteredByGender.length > 0){
        const newList = patientsFilteredByGender.filter((patient) => {
          const name = patient.name.first
          if(name.includes(value, 0)){
            return true
          }else{
            return false
          }
        })
        setPatients(newList)
      }else{
        const newList = data.filter((patient) => {
          const name = patient.name.first
          if(name.includes(value, 0)){
            return true
          }else{
            return false
          }
        })
        setPatients(newList)
        setPatientsFilteredByString(newList)
      }
    }else{
      if(patientsFilteredByGender.length > 0){
        handleIsActiveFilterString(false)
        setPatients(patientsFilteredByGender)
        setPatientsFilteredByString([])
      }else{
        handleIsActiveFilterString(false)
        setPatients(data)
        setPatientsFilteredByString([])
      }
    }
  }

  function filterByStringAndNat(str: string, nat: string) {
    if(patientsFilteredByGender.length > 0){
      const newList = patientsFilteredByGender.filter((patient) => {            
        const name = patient.name.first
        if(name.includes(str, 0) && patient.nat === nat){
          return true
        }else{
          return false
        }
      })
      setPatients(newList)
    }else{
      const newList = data.filter((patient) => {
        
        const name = patient.name.first
        if(name.includes(str, 0) && patient.nat === nat){
          return true
        }else{
          return false
        }
      })
      setPatients(newList)
      setPatientsFilteredByString(newList)
    }
  }

  function getPatientByGender(gender: string){
    if(patientsFilteredByString.length > 0){
      const newList = patientsFilteredByString.filter((patient) => {
        if(patient.gender === gender){
          return true
        }else{
          return false
        }
      })
      setPatients(newList)
    }else{
      const newList = data.filter((patient) => {
        if(patient.gender === gender){
          return true
        }else{
          return false
        }
      })
      setPatients(newList)
      setPatientsFilteredByGender(newList)
    }
  }

  function handlePatientDetails(patient: Object) {
    setPatientDetails(patient)
  }

  function getPatientByID(id: string){
    patients.forEach((patient) => {
      if(patient?.id?.value === id){
        setPatientDetails(patient)
      }
    })
  }

  function handleIsActiveFilterString(value: boolean){
    setIsActiveFilterString(value)
  }

  function handleIsActiveFilterGender(value: boolean){
    setIsActiveFilterGender(value)
  }

  function clearFilterByGender() {
    if(patientsFilteredByString.length > 0){
      setPatients(patientsFilteredByString)
      handleIsActiveFilterGender(false)
      setPatientsFilteredByGender([])
    }else{
      setPatientsFilteredByGender([])
      setPatients(data)
      handleIsActiveFilterGender(false)
    }
  }
  
  return (
    <TableContext.Provider value={{
      patients,
      patientDetails, 
      isActiveFilterString,
      isActiveFilterGender,
      loadingMore, 
      filterByString,
      filterByStringAndNat, 
      handlePatientDetails, 
      getPatientByID,
      getPatientByGender,
      handleIsActiveFilterString,
      handleIsActiveFilterGender,
      clearFilterByGender
    }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTableContext(){
	const context = useContext(TableContext)
	return context
}