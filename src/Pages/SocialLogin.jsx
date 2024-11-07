import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic();
    const { googleLogIn } = useContext(AuthContext); 

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogIn();
            const userInfo = {
                userName: result.user.displayName,
                userEmail: result.user.email,
                userPhoto: result.user.photoURL,
                userType: "User",
            };
    
            const response = await axiosPublic.get(`/users/${userInfo.userEmail}`);
            if (!response.data) {
                await axiosPublic.post('/users', userInfo);
            }
    
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate('/dashboard', { replace: true });
            });
        } catch (error) {
            console.error("Error during Google login:", error);
            if (error.code === 'ERR_NETWORK') {
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'Please check your internet connection and try again.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message || 'An error occurred during Google login.',
                });
            }
        }
    };
    

    return (
        <div className="text-center">
            <p className="mb-2">or</p>
            <p className="mb-2">Log In With</p>
            <hr />
            <div className="text-center mt-2">
                <button onClick={handleGoogleLogin} className="btn bg-orange-600 text-white">
                    <FaGoogle className="text-4xl mr-5" /> Log In with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
