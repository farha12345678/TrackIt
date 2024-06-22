import axios from "axios";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})
const UseAxiosSecure = () => {
    axiosSecure.interceptors.request.use(function(config){
        return config;
    }, function(error){
        return Promise.reject(error)
    })
    return axiosSecure
};

export default UseAxiosSecure;