/*
  The `axios` instance in this file is a configuration for making HTTP requests to a specific API base URL. It is created using Axios, a popular JavaScript library for making HTTP requests.

  File:
  - AxiosInstance.js: Configures an Axios instance with a specific base URL for making API requests.

  Key Functionalities:
  - Creates an Axios instance with a predefined base URL (`http://localhost:8000/api/`).
  - Allows consistent and centralized configuration for making HTTP requests to the specified API.

  Note: This configuration promotes reusability and maintainability by encapsulating the common settings for API requests in a separate file.
*/

import axios from 'axios';
let AXIOS_BASE_URL;
if (window.location.origin === 'http://localhost:3000') {
  AXIOS_BASE_URL = 'http://127.0.0.1:8000/api/';
} else {
  AXIOS_BASE_URL = `${window.location.origin}/api/`;
}

const instance = axios.create({
  baseURL: AXIOS_BASE_URL,
  // "https://openmentorship.onrender.com/api/",
  // baseURL: "http://127.0.0.1:8000/api/",
});

export default instance;

// instance for authorized API requests
