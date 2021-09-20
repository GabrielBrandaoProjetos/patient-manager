import { createContext, useContext, useEffect, useState } from "react";

interface TableContextData{
	
}

const TableContext = createContext<TableContextData>({} as TableContextData)

export const TableProvider: React.FC = ({children}) => {


  return (
    <TableContext.Provider value={{}}>
      {children}
    </TableContext.Provider>
  )
}

export function useTableContext(){
	const context = useContext(TableContext)
	return context
}