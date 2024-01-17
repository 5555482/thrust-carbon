import React, { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom"

function Airlines() {
  const [airlines, setAirlines] = useState([])

  useEffect(() => {
    getAirlines();
  }, []);

  const getAirlines = async () => {
    try {
      const check = localStorage.getItem('airlines')

      if (check) {
        setAirlines(JSON.parse(check))
      } else {


        const api = await fetch(`https://api.api-ninjas.com/v1/airlines?apiKey=${process.env.REACT_APP_API_KEY}?iata=SQ`
        );
        if (!api.ok) {
          throw new Error(`HTTP error! Status: ${api.status}`);
        }

        const data = await api.json();

        localStorage.setItem("airlines", JSON.stringify(data.airlines))
        setAirlines(data.airlines)
        console.log(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return <div>
    <Splide options={{ perPage: 4, arrows: false, drag: "free", gap: "2rem", pagination: false }}>
      {airlines.map(airline => {
        return (
          <SplideSlide key={airline.id}>
            <Link to={"/airline/" + airline.id}>
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src={airline.logo_url} alt="" />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{airline.name}</h5>
                </div>
              </div>
            </Link>
          </SplideSlide>
        )
      })}
    </Splide></div>;
}

export default Airlines