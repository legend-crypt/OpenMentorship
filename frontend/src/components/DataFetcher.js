/*
  The `DataFetcher` React component is a reusable component that fetches data from a specified URL endpoint using the Axios library. It manages the state of the fetched data and handles the caching of data in the local storage for improved performance. This component is designed to be used in conjunction with a render prop to customize the rendering of the fetched data.

  Component:
  - DataFetcher: Fetches data from a specified URL and manages caching for improved performance.

  Key Functionalities:
  - Fetches data from the specified URL using the Axios library and the provided access token.
  - Optionally retrieves data from the local storage cache if available.
  - Updates the local state with the fetched data and caches it in the local storage for subsequent use.
  - Accepts a render prop to customize the rendering of the fetched data.

  Note: This component promotes reusability by abstracting away the logic for data fetching and caching, making it easier to integrate in different parts of the application.
*/


import { useState, useEffect } from "react";
import axios from '../utils/axios'

const accessToken = JSON.parse(localStorage.getItem('access_token'));
const config =  {
    headers: {
    Authorization: `Bearer ${accessToken}`
    }, 
}


const DataFetcher = ({render, url, cacheKey}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(cacheKey));
        storedData?
        setData(storedData)
        : axios.get(url, accessToken? config : null)
        .then((response) => {
          if (response.status === 200) {
            console.log(`retrieved from server ${response.data.data}`);
            setData(response.data.data)
            localStorage.setItem(cacheKey, JSON.stringify(response.data.data));
          }
        })
        .catch((error => {
          // alert(`Failed to retrieve ${cacheKey}`, error.data)
          console.log(`Failed to retrieve ${cacheKey}`, error.data);
        }
        ))
      },[]);
    return render(data)
}


export default DataFetcher;