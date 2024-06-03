import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";


const SocialLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state || '/'

    const axiosPublic = UseAxiosPublic()

    const { googleLogIn  } = useContext(AuthContext)

    const handleSocial = handleGoogle => {
       handleGoogle()
        .then(result => {
            const userInfo = {
                userName : result.user?.displayName,
                userEmail:result.user?.email,
                userPhoto:result.user?.photoURL
                
            }
            console.log(userInfo)
           axiosPublic.post('/users', userInfo)
            .then(res=> {
                if(res.data.insertedId){
                    console.log(res.data);
                    navigate(from)
                    
                }
            })
           
        })
    }

    return (
        <div>
            <div>
            <div className="text-center">
                        <p className="mb-2">or</p>

                        <p className="mb-2">Log In With</p>
                        <hr />
                        <div className="text-center mt-2">
                            <button onClick={()=>handleSocial(googleLogIn)} ><FaGoogle className="text-4xl mr-5"></FaGoogle></button>
                           
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default SocialLogin;