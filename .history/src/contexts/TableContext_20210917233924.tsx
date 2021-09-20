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
    setPage(info.page)
  }
  
  async function loadingMore() {  
    const {results, info} = await searchPatients(page+1)
    
    setPatients([...patients, ...results])
    setPage(info.page)
  }

  function filterByString(value: string) {
    if(value){
      if(resultSearch.length > 0){
        const newList = resultSearch.filter((patient) => {
          const name = patient.name.first
          if(name.includes(value, 0)){
            return true
          }else{
            return false
          }
        })
        setResultSearch(newList)
      }else{
        const newList = patients.filter((patient) => {
          const name = patient.name.first
          if(name.includes(value, 0)){
            return true
          }else{
            return false
          }
        })
        setResultSearch(newList)
      }
    }else{
      setResultSearch([])
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
    if(resultSearch.length > 0){
      const newList = resultSearch.filter((patient) => {
        if(patient.gender === gender){
          return true
        }else{
          return false
        }
      })
      setResultSearch(newList)
    }else{
      const newList = patients.filter((patient) => {
        if(patient.gender === gender){
          return true
        }else{
          return false
        }
      })
      setResultSearch(newList)
    }
  }
  
  return (
    <TableContext.Provider value={{
      patients,
      patientDetails, 
      resultSearch, 
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