import { useEffect, useState } from "react";
import FeaturedCard from "./FeaturedCard";

const FeaturedSec = () => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch('features.json')
            .then((res) => res.json())
            .then((data) => {
                setItem(data);
                console.log(data);
            });
    }, []);

    return (
        <div className="my-16 container lg:mx-auto px-6 lg:px-20">
            <div className="mx-auto text-center">
                <h1 className="text-5xl font-bold italic text-gray-800">Featured Section</h1>
                <div className="divider mx-auto w-24 border-t-2 border-red-500 my-4"></div>
            </div>

          
          <div className="grid  gap-8 mt-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center justify-center">
                {item.map((data) => (
                    <FeaturedCard key={data.id} data={data} />
                ))}
            </div>
          
        </div>
    );
};

export default FeaturedSec;
