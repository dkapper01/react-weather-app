# A Simple React App with Weather API and MUI Data Grid

[App url](https://react-weather-app-five-phi.vercel.app/)

**Features**

 - Get latitude and longitude from _Geolocation API_
 - Defaults to St. Louis coordinates in _Geolocation API not supported_
 - Fetched data from Openweather API
 - Reduced the data to only _required JSON_
 - Defined columns for the _DataGrid_
 - _Used_ DataGrid feature for _pagination_
 - _Memoize the data to avoid re-rendering_
 - _Sets status of API call with a loading spinner_
 - Deloyed to vercel 

**Completion time**
About two hours

**Todos**
- "units" Selector (https://openweathermap.org/current#data)
- Multi Language Selector (https://react.i18next.com/, https://openweathermap.org/current#multi)
- Layout Update (Full Screen, https://mui.com/material-ui/react-box/, https://mui.com/x/react-data-grid/layout/)
- Data Source count Flexible (cnt=?)
- Wind Data Add (https://openweathermap.org/current#parameter)
- Weather Icon (https://openweathermap.org/weather-conditions)
- Location coordinate error. User "navigator.geolocation" didn't permission accept. (Define Static Location)
