import { useState, useEffect } from 'react'; 

const useFetch = () => {
    const [data, setData] = useState([]);
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

    useEffect(() => {
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
            const response =  await fetch(`${process.env.REACT_APP_API_URL}/find?lat=${lat}&lon=${long}&cnt=20&appid=${process.env.REACT_APP_API_KEY}`)
            const data = await response.json()
            const mapped = data.list.map(({ main: { humidity, pressure, temp }, name, id }) => ({ id: id, name: name, pressure: pressure, humidity: humidity, temp: temp }));
            setData(mapped);
        } catch (error) {
            console.log(error);
        }
        }
        fetchData();
    }, [lat, long]);

    return { data };
};


export default useFetch