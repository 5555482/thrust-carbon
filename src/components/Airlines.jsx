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
      let options = {
        method: 'GET',
        headers: { 'X-API-Key': process.env.REACT_APP_API_KEY }
      }
      let url = 'https://api.api-ninjas.com/v1/airlines?name=a'

      const api = await fetch(url, options)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)
          setAirlines(data)
        })
        .catch(err => {
          console.log(`error ${err}`)
        });
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return <div className='mr-32 ml-32 mt-10 mb-10'>
    <Splide options={{ perPage: 4, arrows: false, drag: "free", gap: "2rem", pagination: false }}>
      {airlines.map(airline => {
        return (
          <SplideSlide key={airline.name}>
            <Link to={"/airline/" + airline.name}>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src={airline.logo_url} alt="" />
                <h5 className="mb-2 mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{airline.name}</h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{airline.icao}</p>
              </div>
            </Link>
          </SplideSlide>
        )
      })}
    </Splide>
  </div>;
}

export default Airlines