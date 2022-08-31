import React, { useState, useMemo } from 'react';
import './assets/style/App.css';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from './components/useFetch';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link as MuiLink} from "@mui/material";

function App() {
  const [pageSize, setPageSize] = useState(10);
  const { status: { loading }, data } = useFetch();
  // memoize the data to avoid re-rendering
  const rows = useMemo(() => data, [data])
  const { t, i18n } = useTranslation();

  // Define columns for DataGrid
  const columns = [
    { field: 'name', headerName: t("city"), width: 250 },
    { field: 'pressure', headerName: t("pressure"), width: 125 },
    { field: 'humidity', headerName: t("humidity"), width: 125 },
    { field: 'temp', headerName: t("temperature"), width: 125 },
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
            rowsPerPageOptions={[5, 10, 20, 30, 50]}
            pagination
            rows={rows}
            columns={columns}
          />
        </Box>
       ) : (
          <Box sx={{ width: '150px', padding: "150px", margin: "auto" }}>
            <CircularProgress />
          </Box>
        )}
        <div className="language--bar">
          <MuiLink
              className="language--link"
              onClick={() => i18n.changeLanguage("en")}
              underline="hover">
              EN
          </MuiLink>
          <span className="language--seperator">&nbsp;|&nbsp;</span>
          <MuiLink
              className="language--link"
              onClick={() => i18n.changeLanguage("tr")}
              underline="hover">
              TR
          </MuiLink>
        </div>
      <a href="https://github.com/ramazansancar/react-weather-app/">Github Repo</a>
    </div>
  );
}

export default App;
