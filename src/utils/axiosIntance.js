import axios from "axios";
import { token } from "./token";
// const BASE_URL = "https://sanlymerkez.com:6443/api/admin/";
// const BASE_URL = "http://95.85.126.140:80/api/v1/admin/";
const BASE_URL = "https://tanat.com.tm/api/v1/admin/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000000,
  // withCredentials: false,
  headers: {
    Authorization: "Bearer " + token(),
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    // Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwibmFtZSI6IktlcmltIiwiaWF0IjoxNjE2NDUwNjU3fQ.v8iyHYmwNlKVhLUA7LzxybICB8zzbVjRyXeFZbV7IPw'
  },
});

export { BASE_URL, axiosInstance };
