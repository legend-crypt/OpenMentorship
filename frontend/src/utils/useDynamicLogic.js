import { useEffect, useState } from 'react';
import axios from '../utils/axios';

export default function useDynamicLogic(url, atr) {
  const [dataList, setDataList] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem('access_token'));

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    fetchData();
  }, [dataList]);

  const fetchData = () => {
    axios.get(url, config)
      .then(res => {
        const newDataList = res.data.data.map(item => item[atr].user_id);
        console.log(`newDataList ${newDataList}`);
        setDataList(newDataList);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const clickHandler = async (item, attributeToAccess, req, url) => {
    try {
      const itemAttribute = item[attributeToAccess];
      const formData = new FormData();
      formData.append(req, itemAttribute);

      const response = await axios.post(url, formData, config);
      alert(response.data.detail);

      const newItem = response.data.data[atr]; // Use atr as the key to access the dynamic attribute
      // updateLocalStorage(newItem);
      updateDataList(newItem.user_id);
      console.log(`newItem ${newItem.user_id}`);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  // const updateLocalStorage = (newItem) => {
  //   const existingData = JSON.parse(localStorage.getItem(cacheKey)) || [];
  //   const updatedData = [...existingData, newItem];
  //   localStorage.setItem(cacheKey, JSON.stringify(updatedData));
  // };

  const updateDataList = (userId) => {
    setDataList(prevDataList => [...prevDataList, userId]);
  };

  return { dataList, clickHandler };
}
