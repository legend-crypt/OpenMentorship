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
            setData(response.data.data)
            localStorage.setItem(cacheKey, JSON.stringify(response.data.data));
          }
        })
        .catch((error => {
          alert(`Failed to retrieve ${cacheKey}`, error.data)
        }
        ))
      },[]);
    return render(data)
}

export default DataFetcher;