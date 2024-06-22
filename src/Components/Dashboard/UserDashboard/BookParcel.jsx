import { useContext, useState } from "react";

import { AuthContext } from "../../../Providers/AuthProvider";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from './../../../Hooks/UseAxiosPublic';
import Swal from "sweetalert2";

const BookParcel = () => {


    const { user } = useContext(AuthContext)
    const axiosPublic = UseAxiosPublic()

    const axiosSecure = UseAxiosSecure();
    const { data: users } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            console.log(res.data);
            console.log(users);
            return res.data;

        }


    })

    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState(0);

    const calculatePrice = (weight) => {
        if (weight <= 0) return 0;
        if (weight === 1) return 50;
        if (weight === 2) return 100;
        if (weight > 2) return 150;
    };

    const handleWeight = e => {
        const newWeight = parseFloat(e.target.value);
        setWeight(newWeight);
        setPrice(calculatePrice(newWeight));
    };



    const handleAdd = e => {
        e.preventDefault();
        const form = e.target
        const name = users?.userName
        const email = users?.userEmail
        const number = form.number.value;
        const type = form.type.value;
        const weight = form.weight.value;
        const recName = form.recName.value;
        const recNumber = form.recNumber.value;
        const deliveryAdd = form.deliveryAdd.value;
        const deliveryDate = form.deliveryDate.value;
        const latitude = form.latitude.value;
        const longitude = form.longitude.value;
        const price = form.price.value;
        const addParcel = { name, email, number, type, weight, recName, recNumber, deliveryAdd, deliveryDate, latitude, longitude, price }
        console.log(name, email, number, type, weight, recName, recNumber, deliveryAdd, deliveryDate, latitude, longitude, price);
        // send data to the server

        axiosPublic.post('/parcel', addParcel)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire("Parcel Booked Successfully!");
                    e.target.reset()
                    console.log(data.data);
                }

            })

    }
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center mt-5 italic">Book A Parcel</h1>

            </div>
            <div className="hero ">

                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className=" container card shrink-0 mx-auto lg:w-auto shadow-2xl bg-base-200 font-semibold">

                        <form onSubmit={handleAdd} className="card-body">
                            <div className="flex gap-x-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Name</span>
                                    </label>
                                    <input type="name" name="name" readOnly defaultValue={users?.userName} className="input input-bordered" required />
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" readOnly defaultValue={users?.userEmail} className="input input-bordered" required />
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input type="number" name="number" placeholder="Your Phone Number" className="input input-bordered" required />
                                </div>
                            </div>

                            <div className="flex gap-x-10">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Parcel Type</span>
                                    </label>
                                    <input type="text" name="type" placeholder="Parcel Type" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Parcel Weight</span>
                                    </label>
                                    <input type="number"
                                        name="weight"
                                        value={weight}
                                        onChange={handleWeight}
                                        className="input input-bordered"
                                        placeholder="Parcel weight"
                                    />
                                </div>

                            </div>

                            <div className="flex gap-x-5">
                                <div className="form-control">
                                    <label className="label">

                                        <span className="label-text">Receiver’s Name</span>
                                    </label>
                                    <input type="text" name="recName" placeholder="Receiver’s Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Receiver’s Phone Number</span>
                                    </label>
                                    <input type="number" name="recNumber" placeholder="Receiver’s Phone Number" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Parcel Delivery Address</span>
                                    </label>
                                    <input type="text" name="deliveryAdd" placeholder="Type Address" className="input input-bordered" required />
                                </div>
                            </div>

                            <div className="flex gap-x-10">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Requested Delivery Date :</span>
                                    </label>
                                    <input type="date" name="deliveryDate" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Delivery Address Latitude </span>
                                    </label>
                                    <input type="number" name="latitude" placeholder="i.e 21.121365496" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Delivery Address longitude</span>
                                    </label>
                                    <input type="number" name="longitude" placeholder="i.e 21.121365496" className="input input-bordered" required />
                                </div>
                            </div>

                            <div className="form-control w-1/3">
                                <label className="label">
                                    <span className="label-text">Total Price </span>
                                </label>
                                <input type="number" name="price" value={price} className="input input-bordered" required />
                            </div>

                            <div className="w-1/2 text-center mx-auto bg-red-500 text-white text-lg rounded-xl mt-4">
                                <button>Book </button>
                            </div>



                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default BookParcel;