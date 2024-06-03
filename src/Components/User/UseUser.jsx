import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseUser = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxiosSecure();
    const { data:  isUser } = useQuery({
        queryKey: [user?.email,  'isUser'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/user/${user.userEmail}`);
            console.log(res.data);
            return res.data?.User;
            
        }
        
        
    })
    return [isUser]
};

export default UseUser;