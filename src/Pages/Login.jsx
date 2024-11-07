import { useContext } from "react";
import user from "../assets/user.png";
import { Link,  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import SocialLogin from "./SocialLogin";

const Login = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location?.state?.from || '/dashboard'; // Ensure fallback to dashboard if no state is passed

    const { signInUser } = useContext(AuthContext);

    const handleLogIn = (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        console.log(email, password);

        signInUser(email, password)
            .then(result => {
                if (result.user) {
                    // Show success message and then redirect
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: 'Welcome back!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        // Redirect to /dashboard after Swal finishes
                        navigate('/dashboard', { replace: true });
                    });
                }
                e.target.reset();
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message || 'An error occurred during login.',
                });
            });
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <div>
                            <img src={user} alt="User" />
                        </div>
                    </div>
                    <div className="container card shrink-0 mx-auto lg:w-[450px] shadow-2xl bg-base-200 lg:mt-10 font-semibold">
                        <form onSubmit={handleLogIn} className="card-body">
                            <h1 className="text-5xl font-bold">Login now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-orange-600 text-white">Login</button>
                            </div>

                            <SocialLogin />
                        </form>

                        <p className="text-center mb-10">
                            Do not have an account? Please{" "}
                            <Link className="text-red-800" to="/register">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;  