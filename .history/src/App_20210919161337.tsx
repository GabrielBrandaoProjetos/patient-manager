import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Home } from './pages/Home/Home';
import { TableProvider } from './contexts/TableContext';
import { Router } from './routes';


function App() {
  return (
    <>
    <TableProvider>
      <CssBaseline />
      {/* <Home/> */}
      <Router/>
    </TableProvider>
    </>
  );
}

export default App;
