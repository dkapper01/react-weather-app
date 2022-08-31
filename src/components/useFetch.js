import { useState, useEffect } from 'react'; 

const useFetch = () => {
    const [status, setStatus] = useState({loading: true });
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        setStatus({ loading: true });
        const fetchData = async () => {
        // Get latitude and longitude from Geolocation API
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((location) => {
                    setLat(location.coords.latitude);
                    setLong(location.coords.longitude);
                });
            } else {
                // set latitude and longitude to default values if Geolocation API is not supported
                setLat("90.1994");
                setLong("38.6270");
                console.log("Geolocation is not supported by this browser.");
            }
        // Get data from OpenWeatherMap API
        try {
            const response =  await fetch(`${process.env.REACT_APP_API_URL}/find?lat=${lat}&lon=${long}&cnt=30&appid=${process.env.REACT_APP_API_KEY}`)
            const {list} = await response.json()
            // reduce json to only required json for DataGrid to work
            if(list){
                const mapped = list.map(({ main: { humidity, pressure, temp }, name, id }) => ({ id: id, name: name, pressure: pressure, humidity: humidity, temp: temp }));
                setData(mapped);
                setStatus({ loading: false });
            }else{
                setStatus({ loading: true });
            }
            

        } catch (error) {
            console.log(error);
        }
        }
        fetchData();
    }, [lat, long]);

    return { status, data };
};


export default useFetch