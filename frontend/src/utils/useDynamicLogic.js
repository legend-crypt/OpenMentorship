import { useEffect, useState } from 'react'
import axios from '../utils/axios'

export default function useDynamicLogic(url, attributeToAccess, cacheKey, req) {
  const [dataList, setDataList] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('access_token'))

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(cacheKey));
    console.log(`storedData: ${storedData[0].mentor.user_id}`)
    if (storedData) {
      const newDataList = storedData.map(item => item.mentor.user_id);
      setDataList(newDataList);
      console.log(newDataList)
    }
  }, []);

  const clickHandler = async (item) => {
    const itemAttribute = item[attributeToAccess];
    const formData = new FormData();
    formData.append(`${req}`, itemAttribute);

    try {
      const response = await axios.post(url, formData, config);
      alert(response.data.detail);

      const newItem = response.data.data.mentor;
      const existingData = JSON.parse(localStorage.getItem(cacheKey)) || [];
      const updatedData = [...existingData, newItem];
      setDataList(...newItem.user_id)
      localStorage.setItem(cacheKey, JSON.stringify(updatedData));
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return { dataList, clickHandler };
}





