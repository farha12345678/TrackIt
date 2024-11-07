// Loading.js
import { BallTriangle } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <BallTriangle
                height={100}
                width={100}
                color="#ed0505"
                ariaLabel="ball-triangle-loading"
                visible={true}
            />
        </div>
    );
};

export default Loading;
