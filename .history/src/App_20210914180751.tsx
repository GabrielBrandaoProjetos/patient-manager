import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Home } from './pages/Home/Home';
import { TableProvider } from './contexts/TableContext';


function App() {
  return (
    <>
    <TableProvider>
      <CssBaseline />
      <Home />
    </TableProvider>
    </>
  );
}

export default App;
