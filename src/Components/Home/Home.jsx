import Banner from "./Banner/Banner";
import FeaturedSec from "./Featured/FeaturedSec";

import TopMenSec from "./TopMen/TopMenSec";

import HomeStatistics from "./Stats/HomeStatistics";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSec></FeaturedSec>
            <HomeStatistics></HomeStatistics>
            <TopMenSec></TopMenSec>
        
        </div>
    );
};

export default Home;