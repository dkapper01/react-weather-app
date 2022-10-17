import React, { useState, useMemo } from 'react';
import './assets/style/App.css';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from './components/useFetch';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link as MuiLink } from "@mui/material";
import { localeOptions } from './assets/locale/config';

function App() {
  const [pageSize, setPageSize] = useState(10);
  const { status: { loading }, data, setLanguage } = useFetch();
  
  // memoize the data to avoid re-rendering
  const rows = useMemo(() => data, [data])
  const { t, i18n } = useTranslation();

  // Define columns for DataGrid
  const columns = [
    { field: 'name', headerName: t("city"), width: 250 },
    { field: 'pressure', headerName: t("pressure"), width: 125 },
    { field: 'humidity', headerName: t("humidity")+' (%)', width: 125 },
    { field: 'temp', headerName: t("temperature")+' (°)', width: 125 },
    { field: 'wind', headerName: t("wind")+' (km/s)', width: 125 }
  ];

  return (
    <div className="App">
      {/* Check if data has been fetched and if not render Loading... */}
      {!loading ? (
        <Box style={{display: 'flex'}} sx={{ width: '100%' }}>
          <DataGrid
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
            pagination
            {...rows}
            rows={rows.slice(0, pageSize)}
            columns={columns}
          />
        </Box>
       ) : (
          <Box sx={{ width: '150px', padding: "150px", margin: "auto" }}>
            <CircularProgress />
          </Box>
        )}
        <div className="language--bar">
          <span style={{display:'flex', flexDirection:'column', margin: '0px 0px 0px 0px'}}>Select Language: </span>
          <MuiLink
              className="language--link"
              onClick={() => i18n.changeLanguage("en") && window.localStorage.setItem('currentLanguage', 'en') && setLanguage('en')}
              underline="hover">
              <img src={localeOptions.filter(a => a.id==='en')[0].icon} alt="US Flag" height="32px" width="32px" />
          </MuiLink>
          <span className="language--seperator">&nbsp;|&nbsp;</span>
          <MuiLink
              className="language--link"
              onClick={() => i18n.changeLanguage("tr") && window.localStorage.setItem('currentLanguage', 'tr') && setLanguage('tr')}
              underline="hover">
              <img src={localeOptions.filter(a => a.id==='tr')[0].icon} alt="TR Flag" height="32px" width="32px" />
          </MuiLink>
        </div>
      <a href="https://github.com/ramazansancar/react-weather-app/">Github Repo</a>
    </div>
  );
}

export default App;
