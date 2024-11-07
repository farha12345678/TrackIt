import PropTypes from 'prop-types';

const FeaturedCard = ({ data }) => {
    const { title, icon, description } = data;

    return (
        <div className="card lg:h-80 w-full max-w-xs bg-white shadow-lg rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <figure className="flex justify-center mt-6">
                <img className="w-24 h-24 object-contain" src={icon} alt="feature icon" />
            </figure>
            <div className="card-body px-6 py-4 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

FeaturedCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default FeaturedCard;
