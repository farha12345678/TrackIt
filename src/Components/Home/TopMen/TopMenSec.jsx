import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import 'animate.css';

const TopMenSec = () => {
  const axiosPublic = UseAxiosPublic();
  const [topDeliveryMen, setTopDeliveryMen] = useState([]);

  const { data: parcelsData = [] } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosPublic.get('/parcel');
      return res.data;
    },
  });

  const { data: reviewsData = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosPublic.get('/review');
      return res.data;
    },
  });

  const { data: deliveryMenData = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users', { params: { userType: 'Delivery Man' } });
      return res.data;
    },
  });

  useEffect(() => {
    const calculateTopDeliveryMen = () => {
      if (parcelsData.length === 0 || reviewsData.length === 0 || deliveryMenData.length === 0) return;

      const parcelsDelivered = {};
      parcelsData.forEach(parcel => {
        if (parcelsDelivered[parcel.deliveryManId]) {
          parcelsDelivered[parcel.deliveryManId]++;
        } else {
          parcelsDelivered[parcel.deliveryManId] = 1;
        }
      });

      const averageRatings = {};
      reviewsData.forEach(review => {
        if (averageRatings[review.deliveryManId]) {
          averageRatings[review.deliveryManId].totalRating += parseInt(review.rating);
          averageRatings[review.deliveryManId].count++;
        } else {
          averageRatings[review.deliveryManId] = {
            totalRating: parseInt(review.rating),
            count: 1
          };
        }
      });

      const topMenData = Object.keys(parcelsDelivered).map(deliveryManId => {
        const deliveryMan = deliveryMenData.find(user => user._id === deliveryManId);
        if (!deliveryMan) return null;
        
        const name = deliveryMan.userName || 'Unknown';
        const image = deliveryMan.userPhoto || 'https://via.placeholder.com/150';
        const parcels = parcelsDelivered[deliveryManId];
        const averageReview = (averageRatings[deliveryManId] ? (averageRatings[deliveryManId].totalRating / averageRatings[deliveryManId].count).toFixed(2) : 0);

        return {
          deliveryManId,
          name,
          image,
          parcelsDelivered: parcels,
          averageReview
        };
      }).filter(Boolean);

      topMenData.sort((a, b) => {
        if (b.parcelsDelivered === a.parcelsDelivered) {
          return b.averageReview - a.averageReview;
        }
        return b.parcelsDelivered - a.parcelsDelivered;
      });

      setTopDeliveryMen(topMenData.slice(0, 3));
    };

    calculateTopDeliveryMen();
  }, [parcelsData, reviewsData, deliveryMenData]);

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="italic text-5xl font-bold text-center mt-16 mb-12 text-gray-800">
        The Top Delivery Men
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {topDeliveryMen.map((man) => (
          <div key={man.deliveryManId} className="card w-full bg-white shadow-lg rounded-lg animate__animated animate__fadeInUp animate__delay-0.5s">
            <figure className="pt-8 flex justify-center">
              <img className="h-32 w-32 rounded-full border-4 border-blue-500" src={man.image} alt={man.name} />
            </figure>
            <div className="card-body text-center p-6">
              <h2 className="text-2xl font-semibold text-blue-700">{man.name}</h2>
              <p className="text-lg text-gray-600 mt-2">
                Parcels Delivered: <span className="text-blue-500 font-bold">{man.parcelsDelivered}</span>
              </p>
              <p className="text-lg text-gray-600 mt-2">
                Average Rating: <span className="text-green-500 font-bold">{man.averageReview}</span> ★
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMenSec;
