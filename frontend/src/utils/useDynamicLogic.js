/*
  The `useDynamicLogic` custom React hook encapsulates dynamic logic related to handling data and interactions with the server. It is designed to be used in components where dynamic data manipulation and server requests are required.

  Hook:
  - useDynamicLogic: Manages dynamic logic for fetching and updating data related to mentor-student interactions.

  Key Functionalities:
  - Retrieves data from the specified URL using the provided access token and configuration.
  - Updates the local state (`dataList`) with the relevant attribute values (e.g., mentor or student user IDs).
  - Provides a click handler function (`clickHandler`) for handling user interactions, such as making requests or initiating meetings.
  - Sends requests to the server using the provided URL and updates the local state accordingly.
  - Logs relevant information for debugging purposes.

  Note: This hook promotes reusability by encapsulating logic related to server interactions and dynamic data manipulation, enhancing the maintainability of the code that utilizes it.
*/




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

  const clickHandler = async (item, req, url) => {
    console.log(`item click ${item}`);
    try {
      const itemAttribute = item.email;
      const formData = new FormData();
      formData.append(req, itemAttribute);

      const response = await axios.post(url, formData, config);
      // alert(response.data.detail);
      console.log(response.data.detail);

      const newItem = response.data.data; // Use atr as the key to access the dynamic attribute
      // updateLocalStorage(newItem);
      updateDataList(newItem.user.user_id);
    } catch (error) {
      // alert(error.response.data.error);
      console.log(error.response.data.error);
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
