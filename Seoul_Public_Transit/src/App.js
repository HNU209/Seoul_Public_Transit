import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Splash from "./components/Splash";
import Trip from "./components/Trip";
import "./css/app.css";

const fetchData = async (FilE_NAME) => {
  const res = await axios.get(
    `https://raw.githubusercontent.com/HNU209/Seoul_Public_Transit/main/Seoul_Public_Transit/src/data/${FilE_NAME}.json`
    );
  // const data = res.then((r) => r.data);
  return res.data;
};

 
const App = () => {
  const [icon, setIcon] = useState([]);
  const [trip, setTrip] = useState([]);
  const [line, setLine] = useState([]);
  const [isloaded, setIsLoaded] = useState(false);

  const getData = useCallback(async () => {
    const TRIP = await Promise.all([
      fetchData("bus_0to9"),
      fetchData("bus_9to12"),
      fetchData("bus_12to18"),
      fetchData("bus_18to24"),
      fetchData("bus_24to"),
      fetchData("trail"),
    ]);
    const ICON = await Promise.all([
      fetchData("icon"),
      fetchData("trail_icon"),
    ]);

    const LINE = await Promise.all([
      fetchData("line"),
      fetchData("trail_line"),
    ]);

    // const TRAIL = await fetchData("trail");


    setTrip((prev) => TRIP.flat()); 
    setIcon((prev) => ICON.flat());
    setLine((prev) => LINE.flat());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="container">
      {!isloaded && <Splash />}
      {isloaded && (
        <Trip 
              trip={trip}
              icon={icon}
              line={line}
              />
      )}
    </div>
  );
};

export default App;
