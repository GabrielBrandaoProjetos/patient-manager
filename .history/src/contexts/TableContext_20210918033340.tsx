import { createContext, useContext, useEffect, useState } from "react";
import { searchPatients } from "../services/api";

interface TableContextData{
	patients: any[]
  patientDetails: any
  isActiveFilterString: boolean
  isActiveFilterGender: boolean
  loadingMore: () => void
  filterByString: (value: string) => void
  handlePatientDetails: (patient: Object) => void
  getPatientByID: (id: string) => void
  getPatientByGender: (gender: string) => void
  handleIsActiveFilterString: (value: boolean) => void
  handleIsActiveFilterGender: (value: boolean) => void
  clearFilterByGender: () => void
}

const TableContext = createContext<TableContextData>({} as TableContextData)

export const TableProvider: React.FC = ({children}) => {
  const [data, setData] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [patientDetails, setPatientDetails] = useState<any>(null)
  const [patientsFilteredByString, setPatientsFilteredByString] = useState<any[]>([])
  const [patientsFilteredByGender, setPatientsFilteredByGender] = useState<any[]>([])
  const [isActiveFilterString, setIsActiveFilterString] = useState(false)
  const [isActiveFilterGender, setIsActiveFilterGender] = useState(false)
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
    const [str, nat] = value.split(" ")
    
    
    if(value){
      if(str && nat){
        if(patientsFilteredByGender.length > 0){
          const newList = patientsFilteredByGender.filter((patient) => {
            const name = patient.name.first
            if(name.includes(value, 0) && patient.nat === nat){
              return true
            }else{
              return false
            }
          })
          setPatients(newList)
        }else{
          const newList = data.filter((patient) => {
            const name = patient.name.first
            if(name.includes(value, 0) && patient.nat === nat){
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
      if(patient.id.value === id){
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