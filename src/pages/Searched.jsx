import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

function Searched() {
  const [searchedAirlines, setSearchedAirlines] = useState([])

  let params = useParams()

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  const getSearched = async (name) => {
    try {
      const check = localStorage.getItem('airlines')

      if (check) {
        setSearchedAirlines(JSON.parse(check))
      } else {
        const api = await fetch(
          `https://api.api-ninjas.com/v1/airlines?apiKey=${process.env.REACT_APP_API_KEY}&name=${name}`
        );
        if (!api.ok) {
          throw new Error(`HTTP error! Status: ${api.status}`);
        }

        const data = await api.json();

        localStorage.setItem("airlines", JSON.stringify(data.airlines))
        setSearchedAirlines(data.results)
        console.log(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  return (
    <div className="grid grid-cols-4 gap-4">
      {searchedAirlines.map((airline) => {
        return (<div key={airline.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <img className="rounded-t-lg" src={airline.logo_url} alt="" />

          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{airline.name}</h5>
          </div>
        </div>)
      }
      )}


    </div>
  )
}

export default Searched