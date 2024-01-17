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
      let options = {
        method: 'GET',
        headers: { 'X-API-Key': process.env.REACT_APP_API_KEY }
      }
      let url = ('https://api.api-ninjas.com/v1/airlines?name=' + name)

      const api = await fetch(url, options)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)
          setSearchedAirlines(data)
        })
        .catch(err => {
          console.log(`error ${err}`)
        });
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="m-32 grid grid-cols-4 gap-4">
      {searchedAirlines.map((airline) => {
        return (<div key={airline.name} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

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