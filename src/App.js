import React, { useState, useMemo } from 'react';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from './components/useFetch';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
  const [pageSize, setPageSize] = useState(10);
  const { status: { loading }, data } = useFetch();
  // memoize the data to avoid re-rendering
  const rows = useMemo(() => data, [data])

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
      {!loading ? (
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rows={rows}
            columns={columns}
          />
        </div>
       ) : (
          <Box sx={{ width: '150px', padding: "150px", margin: "auto" }}>
            <CircularProgress />
          </Box>
        )}
    </div>
  );
}

export default App;
