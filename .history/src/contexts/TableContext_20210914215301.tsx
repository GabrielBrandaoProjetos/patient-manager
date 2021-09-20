import { createContext, useContext, useEffect, useState } from "react";
import { searchPatients } from "../services/api";

interface TableContextData{
	patients: any[]
  loadingMore: () => void
  filterByString: () => void
}

const TableContext = createContext<TableContextData>({} as TableContextData)

export const TableProvider: React.FC = ({children}) => {
  const [patients, setPatients] = useState<any[]>([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    async function handleSearchPatients() {
      const {results, info} = await searchPatients(page)
      setPatients(results)
      setPage(info.page)
    }
    handleSearchPatients()
  }, [])

  async function loadingMore() {  
    const {results, info} = await searchPatients(page+1)
    setPatients([...patients, ...results])
    setPage(info.page)
  }

  function filterByString(value: string) {
    patients.filter((patient) => {
      console.log(patient.name.first.includes(value, 0));     
    })
  }
  
  return (
    <TableContext.Provider value={{patients, loadingMore}}>
      {children}
    </TableContext.Provider>
  )
}

export function useTableContext(){
	const context = useContext(TableContext)
	return context
}