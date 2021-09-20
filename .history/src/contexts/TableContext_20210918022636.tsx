import { createContext, useContext, useEffect, useState } from "react";
import { searchPatients } from "../services/api";

interface TableContextData{
	patients: any[]
  patientDetails: any
  patientsFilteredByString: any[]
  patientsFilteredByGender: any[]
  isActiveFilter: boolean
  loadingMore: () => void
  filterByString: (value: string) => void
  handlePatientDetails: (patient: Object) => void
  getPatientByID: (id: string) => void
  getPatientByGender: (gender: string) => void
  handleIsActiveFilter: (value: boolean) => void
}

const TableContext = createContext<TableContextData>({} as TableContextData)

export const TableProvider: React.FC = ({children}) => {
  const [data, setData] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [patientDetails, setPatientDetails] = useState<any>(null)
  const [patientsFilteredByString, setPatientsFilteredByString] = useState<any[]>([])
  const [patientsFilteredByGender, setPatientsFilteredByGender] = useState<any[]>([])
  const [isActiveFilter, setIsActiveFilter] = useState(false)
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
    setData([...patients, ...results])
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
        setPatients(patientsFilteredByGender)
      }else{
        handleIsActiveFilter(false)
        setPatients(data)
        setPatientsFilteredByString([])

      }
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

  function handleIsActiveFilter(value: boolean){
    setIsActiveFilter(value)
  }
  
  return (
    <TableContext.Provider value={{
      patients,
      patientDetails, 
      patientsFilteredByString,
      patientsFilteredByGender,
      isActiveFilter,
      loadingMore, 
      filterByString, 
      handlePatientDetails, 
      getPatientByID,
      getPatientByGender,
      handleIsActiveFilter
    }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTableContext(){
	const context = useContext(TableContext)
	return context
}