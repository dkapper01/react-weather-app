import React, { useState, useEffect } from 'react';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(10);


  useEffect(() => {
    const fetchData = async () => {
      // Get latitude and longitude from Geolocation API
      navigator.geolocation.getCurrentPosition((location) => {
        setLat(location.coords.latitude);
        setLong(location.coords.longitude);
      });
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/find?lat=${lat}&lon=${long}&cnt=20&appid=${process.env.REACT_APP_API_KEY}`)
          .then(response => response.json())
          .then(results => {
            // mapped json results to rows so DataGrid can render them
            const data = results.list.map(({ main: { humidity, pressure, temp }, name, id }) => ({ id: id, name: name, pressure: pressure, humidity: humidity, temp: temp }));
            setRows(data);
          })
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [lat, long]);

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
      {rows.length > 0 ? (
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
      ) : <h1>Loading...</h1>}
    </div>
  );
}

export default App;
