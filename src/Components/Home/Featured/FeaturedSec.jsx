import { useEffect, useState } from "react";
import FeaturedCard from "./FeaturedCard";


const FeaturedSec = () => {
    const [item , setItem] = useState([])
    useEffect(()=>{
        fetch('features.json')
        .then(res=>res.json())
        .then(data=>
           { setItem(data)
            console.log(data);
           }
            
        )
       
    },[])
    return (
        <div>
            <div className=" mx-auto w-80">
                <h1 className="text-4xl font-bold italic">Featured Section</h1>
                <div className="divider"></div>
            </div>
           
           <div className="lg:flex grid  gap-x-5 my-10 items-center justify-center">
           {
                item.map(data=> <FeaturedCard key={data.id} data={data} ></FeaturedCard>)
                }
           </div>
        </div>
    );
};

export default FeaturedSec;