import { createContext, useContext, useEffect, useState } from "react";

interface TableContextData{
	patients: any[]
}

const TableContext = createContext<TableContextData>({} as TableContextData)

export const TableProvider: React.FC = ({children}) => {
  const [patients, setPatients] = useState([])



  return (
    <TableContext.Provider value={{patients}}>
      {children}
    </TableContext.Provider>
  )
}

export function useTableContext(){
	const context = useContext(TableContext)
	return context
}