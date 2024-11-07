import { useEffect, useState } from 'react';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import 'animate.css';

const HomeStatistics = () => {
    const axiosPublic = UseAxiosPublic();
    const [totalBooked, setTotalBooked] = useState(0);
    const [totalDelivered, setTotalDelivered] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        (async () => {
            const parcelsResponse = await axiosPublic.get('/parcel');
            const usersResponse = await axiosPublic.get('/users');
            const parcels = parcelsResponse.data;
            const users = usersResponse.data;

            setTotalBooked(parcels.length);
            setTotalDelivered(parcels.filter(parcel => parcel.status === 'Deliver').length);
            setTotalUsers(users.length);
        })();
    }, [axiosPublic]);

    return (
        <div className="grid lg:flex items-center justify-center my-10 px-6">
            <div className="lg:stats shadow-lg rounded-lg bg-gradient-to-r from-red-300 via-red-50 to-red-400 animate__animated animate__fadeInUp animate__delay-0.5s space-y-8 lg:space-y-0 lg:flex lg:space-x-8 p-6 lg:p-12">

                <div className="stat place-items-center p-4 bg-white shadow-md rounded-lg animate__animated animate__fadeInUp animate__delay-0.8s">
                    <div className="stat-title text-xl font-semibold text-gray-800">Total Parcel Booked</div>
                    <div className="stat-value text-4xl font-bold text-blue-600">{totalBooked}</div>
                    <div className="stat-desc text-gray-500 mt-2">From January 1st to June 1st</div>
                </div>

                <div className="stat place-items-center p-4 bg-white shadow-md rounded-lg animate__animated animate__fadeInUp animate__delay-1s">
                    <div className="stat-title text-xl font-semibold text-gray-800">Total Parcel Delivered</div>
                    <div className="stat-value text-4xl font-bold text-green-600">{totalDelivered}</div>
                    <div className="stat-desc text-gray-500 mt-2">↗︎ 40 (2%)</div>
                </div>

                <div className="stat place-items-center p-4 bg-white shadow-md rounded-lg animate__animated animate__fadeInUp animate__delay-1.2s">
                    <div className="stat-title text-xl font-semibold text-gray-800">Total Users</div>
                    <div className="stat-value text-4xl font-bold text-purple-600">{totalUsers}</div>
                    <div className="stat-desc text-gray-500 mt-2">↘︎ 90 (14%)</div>
                </div>

            </div>
        </div>
    );
};

export default HomeStatistics;
