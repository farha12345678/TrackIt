import { useEffect, useState } from "react";
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';


const HomeStatistics = () => {



    const axiosPublic = UseAxiosPublic()
    const [totalBooked, setTotalBooked] = useState(0);
    const [totalDelivered, setTotalDelivered] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        (async () => {
            const parcelsResponse = await axiosPublic.get('/parcel');
            const usersResponse = await axiosPublic.get('/users');

            const parcels = parcelsResponse.data;
            const users = usersResponse.data;
            console.log(parcels);
            setTotalBooked(parcels.length);
            setTotalDelivered(parcels.filter(parcel => parcel.status === 'Deliver').length);
            setTotalUsers(users.length);
        });
    }, []);
    return (
        <div className="grid lg:flex items-center justify-center  my-10">
            <div className="lg:stats shadow bg-red-100">

                <div className="stat place-items-center">
                    <div className="stat-title text-lg font-semibold text-black">Total parcel booked</div>
                    <div className="stat-value">{totalBooked}</div>
                    <div className="stat-desc">From January 1st to June 1st</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title text-lg font-semibold text-black">Total parcel delivered</div>
                    <div className="stat-value text-secondary">{totalDelivered}</div>
                    <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title text-lg font-semibold text-black">Total users</div>
                    <div className="stat-value">{totalUsers}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>


        </div>
    );
};

export default HomeStatistics;