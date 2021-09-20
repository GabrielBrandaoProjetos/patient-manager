import { createContext, useContext, useEffect, useState } from "react";
import { searchPatients } from "../services/api";

interface TableContextData{
	patients: any[]
  patientDetails: any
  resultSearch: any[]
  loadingMore: () => void
  filterByString: (value: string) => void
  handlePatientDetails: (patient: Object) => void
  getPatientByID: (id: string) => void
}

const TableContext = createContext<TableContextData>({} as TableContextData)

export const TableProvider: React.FC = ({children}) => {
  const [patients, setPatients] = useState<any[]>([])
  const [patientDetails, setPatientDetails] = useState<any>(null)
  const [resultSearch, setResultSearch] = useState<any[]>([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    async function handleSearchPatients() {
      const {results, info} = await searchPatients(page)
      setPatients(results)
      setPage(info.page)
    }
    handleSearchPatients()
  }, [page])

  async function loadingMore() {  
    const {results, info} = await searchPatients(page+1)
    setPatients([...patients, ...results])
    setPage(info.page)
  }

  function filterByString(value: string) {
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
  
  return (
    <TableContext.Provider value={{
      patients,
      patientDetails, 
      resultSearch, 
      loadingMore, 
      filterByString, 
      handlePatientDetails, 
      getPatientByID
    }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTableContext(){
	const context = useContext(TableContext)
	return context
}