import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import SocialLogin from "./SocialLogin";
import user from "../assets/user.png";

const Register = () => {
    const axiosPublic = UseAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const { createUser } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        const type = form.get("type");
        const name = form.get("name");
        const photo = form.get("photo");
        const number = form.get("number");

        createUser(email, password, type, name, photo, number)
            .then(() => {
                const userInfo = {
                    userName: name,
                    userEmail: email,
                    userPhoto: photo,
                    userType: type,
                    userNumber: number,
                };
                axiosPublic.post("/users", userInfo).then((res) => {
                    if (res.data.insertedId) {
                        Swal.fire("User Created Successfully");
                        e.target.reset();
                    }
                });
            })
            .catch((error) => {
                Swal.fire(error.message);
            });

        // Validation
        if (password.length < 6) {
            Swal.fire("Your password should have at least six characters");
            return;
        } else if (!/[A-Z]/.test(password)) {
            Swal.fire("Your password should have at least one uppercase character");
            return;
        } else if (!/[a-z]/.test(password)) {
            Swal.fire("Your password should have at least one lowercase character");
            return;
        } else if (!/[0-9]/.test(password)) {
            Swal.fire("Your password should have at least one numeric character");
            return;
        }
    };

    return (
        <div
            className="hero min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${user})`,
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional dark overlay
                backgroundBlendMode: "overlay",
            }}
        >
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl mx-auto">
                <div className="card w-full max-w-4xl p-8 shadow-2xl bg-white bg-opacity-80 font-semibold">
                    <h1 className="text-4xl font-bold text-center mb-4 text-purple-900">Register Now!</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        {/* Grid Layout for Name, Photo, Email, and Phone */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
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
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input type="text" name="number" placeholder="Phone Number" className="input input-bordered" required />
                            </div>
                        </div>

                        {/* Select Type and Password Fields */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Type</span>
                                </label>
                                <select className="input input-bordered" required name="type">
                                    <option value="User">User</option>
                                    <option value="Delivery Man">Delivery Man</option>
                                    <option disabled value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <span className="label-text">Password</span>
                                <label className="label input input-bordered">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                                    </button>
                                </label>
                            </div>
                        </div>

                        {/* Register Button */}
                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-purple-700 to-pink-600 text-white w-full">Register</button>
                        </div>

                        <SocialLogin />
                        <p className="text-center mt-4">
                            Already have an account? <Link className="text-purple-700 hover:underline" to="/login">Log In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
