import 'animate.css';
import '../../../index.css';

const Banner = () => {
    return (
        <div className="my-10 rounded-2xl lg:mx-20 overflow-hidden shadow-lg">
            <div
                className="hero lg:h-[450px] relative"
                style={{
                    backgroundImage: 'url(https://i.ibb.co/fq5LYmX/pexels-kindelmedia-6868618.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>

                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-white relative z-10 animate__animated animate__fadeIn animate__delay-1s">
                    <div className="max-w-md mx-auto">
                        <h1 className="mb-5 text-5xl font-bold tracking-wide animate__animated animate__fadeInDown animate__delay-2s">
                            Welcome to <span className="text-red-500">TrackIt</span>
                        </h1>
                        <p className="mb-5 text-lg animate__animated animate__fadeInUp animate__delay-3s">
                            We provide you with the safest services in the country. Explore, experience, and feel secure.
                        </p>
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="input input-bordered w-full max-w-xs px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 animate__animated animate__zoomIn animate__delay-4s"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
