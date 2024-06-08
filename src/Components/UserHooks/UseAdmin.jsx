import { useContext } from "react";


import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const UseAdmin = () => {
    const axiosSecure = UseAxiosSecure()

    const {user , loader} = useContext(AuthContext)
   
    const { data: userType = '', isLoading } = useQuery({
        queryKey: ['userType', user?.email],
        enabled: !loader && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure(`/users/${user?.email}`)
          console.log(data.userType);
          return data.userType
        },
      })
    
      //   Fetch user info using logged in user email
    
      return [userType, isLoading]
    }


export default UseAdmin

