import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { TableProvider } from './contexts/TableContext';
import { Router } from './routes';
import { BrowserRouter} from "react-router-dom";


function App() {
  return (
    <>
    <TableProvider>
      <CssBaseline />
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
    </TableProvider>
    </>
  );
}

export default App;
