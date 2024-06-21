import 'animate.css';
import '../../../index.css'

const Banner = () => {
    return (
        <div className="my-10 rounded-2xl lg:mx-20 ">
           <div className="hero lg:h-[450PX]" style={{backgroundImage: 'url(https://i.ibb.co/fq5LYmX/pexels-kindelmedia-6868618.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-white">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold animate__animated  animate__bounceIn ">Welcome to <span className="text-red-600">TrackIt</span></h1>
      <p className="mb-5">We provide you most safest service in our country....</p>
      <input type="text" placeholder="Search here...." className="input input-bordered w-full max-w-xs" />
    </div>
  </div>
</div>
        </div>
    );
};

export default Banner;