import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://assignment-12-server-blond.vercel.app'
})
const UseAxiosPublic = () => {
    return axiosPublic
};

export default UseAxiosPublic;