

import { useContext, useState } from "react";
import { Link} from "react-router-dom";

import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import user from "../assets/user.png"
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import SocialLogin from "./SocialLogin";





const Register = () => {
    // const navigate = useNavigate()
    // const location = useLocation()
    // const from = location?.state || '/'

    const axiosPublic = UseAxiosPublic()


    const [showPassword, setShowPassword] = useState(false)

    const { createUser } = useContext(AuthContext)

    

    const handleRegister = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')
        const type = form.get('type')
        const name = form.get('name')
        const photo = form.get('photo')
        const number = form.get('number')

        console.log(email, password, type, name, photo);
        createUser(email, password, type, name, photo,number)
            .then(() => {
                const userInfo = {
                    userName: name,
                    userEmail: email,
                    userPhoto: photo,
                    userType: type,
                    userNumber:number
                }
                console.log(userInfo);
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log(res.data);
                            Swal.fire('User Created Successfully')

                        }
                    })

            })
            .catch(error => {

                Swal.fire(error.message)
            })

        // // validition
        if (password.length < 6) {
            Swal.fire('Your password should have at least six character');

            return;
        }
        else if (!/[A-Z]/.test(password)) {
            Swal.fire('Your password should have at least one uppercase character');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            Swal.fire('Your password should have at least one lowercase character');
            return;
        }
        else if (!/[0-9]/.test(password)) {
            Swal.fire('Your password should have at least one neumeric character');
            return;
        }




    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">

                        <img src={user} alt="" />
                    </div>
                    <div className=" container card shrink-0 mx-auto lg:w-[450px] shadow-2xl bg-base-200 font-semibold">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text ">Name</span>
                                </label>
                                <input type="name" name="name" placeholder="Name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Type</span>
                                </label>
                                <select className="input input-bordered" required name="type"  >
                                    <option value="User">User</option>
                                    <option value="Delivery Man">Delivery Man</option>
                                    <option disabled value="Admin">Admin</option>

                                </select>

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input type="text" name="number" placeholder="Photo URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <span className="label-text">Password</span>
                                <label className="label input input-bordered">
                                    <input type={showPassword ? "text" : "password"}
                                        name="password" placeholder="Password" />
                                    <button onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaRegEye></FaRegEye>
                                        }
                                    </button>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-orange-600 text-white">Register</button>

                            </div>
                           
                            <SocialLogin></SocialLogin>
                            <p className="text-center">Already have an account?<Link className="text-red-800" to='/login'>LogIn</Link></p>

                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Register;

