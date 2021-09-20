import { createContext, useContext, useEffect, useState } from "react";
import { searchPatients } from "../services/api";

interface TableContextData{
	patients: any[]
  patientDetails: any
  patientsFilteredByString: any[]
  patientsFilteredByGender: any[]
  loadingMore: () => void
  filterByString: (value: string) => void
  handlePatientDetails: (patient: Object) => void
  getPatientByID: (id: string) => void
  getPatientByGender: (gender: string) => void
}

const TableContext = createContext<TableContextData>({} as TableContextData)

export const TableProvider: React.FC = ({children}) => {
  const [data, setData] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [patientDetails, setPatientDetails] = useState<any>(null)
  const [patientsFilteredByString, setPatientsFilteredByString] = useState<any[]>([])
  const [patientsFilteredByGender, setPatientsFilteredByGender] = useState<any[]>([])
  const [page, setPage] = useState(0)
  
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
    
    setPatients([...patients, ...results])
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
      }
    }else{
      setPatients(data)
    }
  }

  function handlePatientDetails(patient: Object) {
    setPatientDetails(patient)
  }

  function getPatientByID(id: string){
    patients.forEach((patient) => {
      if(patient.id.value === id){
        setPatientDetails(patient)
      }
    })
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
      setPatientsFilteredByGender(newList)
    }else{
      const newList = patients.filter((patient) => {
        if(patient.gender === gender){
          return true
        }else{
          return false
        }
      })
      setPatientsFilteredByString(newList)
    }
  }
  
  return (
    <TableContext.Provider value={{
      patients,
      patientDetails, 
      patientsFilteredByString,
      patientsFilteredByGender,
      loadingMore, 
      filterByString, 
      handlePatientDetails, 
      getPatientByID,
      getPatientByGender
    }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTableContext(){
	const context = useContext(TableContext)
	return context
}