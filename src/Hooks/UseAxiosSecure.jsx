import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-server-blond.vercel.app'
})
const UseAxiosSecure = () => {
    return axiosSecure
};

export default UseAxiosSecure;