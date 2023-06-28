import { useState, useEffect } from 'react';
import { locale } from '../assets/locale/config';

const useFetch = () => {
    const [status, setStatus] = useState({loading: true });
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [data, setData] = useState([]);
    const [language, setLanguage] = useState(locale);
    const count = '50';
    
    

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
            console.log('try '+language);
            if(!lat || !long){return false;}
            console.log('fetch '+language);
            await fetch(`${process.env.REACT_APP_API_URL}/weather/find/${lat}/${long}?count=${count}&lang=${language}&units=metric`).then((response) => response.json())
                .then((data) => {
                const {list} = data;
                const mapped = list.map(({ main: { humidity, pressure, temp }, wind:{ speed }, name, id }) => ({ id: id, name: name, pressure: pressure, humidity: humidity, temp: temp, speed: speed }));
                setData(mapped);
                setStatus({ loading: false });
            });
            // reduce json to only required json for DataGrid to work
        }catch(error){
            console.log(error);
        }
        }
        fetchData();
    }, [lat, long, language]);

    return { status, data, setLanguage };
};


export default useFetch;
