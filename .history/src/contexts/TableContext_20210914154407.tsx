import { createContext, useContext, useEffect, useState } from "react";

interface TableContextData{
	
}

const TableContext = createContext<TableContextData>({} as TableContextData)