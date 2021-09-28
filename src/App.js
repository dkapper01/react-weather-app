import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from './components/useFetch';

function App() {
  const [pageSize, setPageSize] = useState(10);

  const { data } = useFetch();
  
  // Define columns for DataGrid
  const columns = [
    { field: 'name', headerName: 'City', width: 150 },
    { field: 'pressure', headerName: 'Pressure', width: 150 },
    { field: 'humidity', headerName: 'Humidity', width: 150 },
    { field: 'temp', headerName: 'Temperature', width: 150 },
  ];

  return (
    <div className="App">
      {/* Check if data has been fetched and if not render Loading... */}
      {data.length > 0 ? (
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rows={data}
            columns={columns}
          />
        </div>
       ) : <h1>Loading...</h1>}
    </div>
  );
}

export default App;
