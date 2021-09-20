import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Home } from './pages/Home/Home';
import { TableProvider } from './contexts/TableContext';
import { Router } from './routes';
import { BrowserRouter} from "react-router-dom";


function App() {
  return (
    <>
    <TableProvider>
      <CssBaseline />
        <BrowserRouter>
      {/* <Home/> */}
          <Router/>
        </BrowserRouter>
    </TableProvider>
    </>
  );
}

export default App;
