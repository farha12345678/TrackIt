
import { PropTypes } from 'prop-types';

const FeaturedCard = ({ data}) => {
    const {title,icon,description} = data;
    return (
        <div>
            <div>
            <div className="card lg:h-80 lg:w-96 bg-base-100 shadow-xl">
  <figure><img className='w-24' src={icon} /></figure>
  <div className="card-body">
    <h2 className="text-center text-xl font-bold">{title}</h2>
    <p>{description}</p>
    
  </div>
</div>
            </div>
        </div>
    );
};

FeaturedCard.propTypes={
    data:PropTypes.object
}

export default FeaturedCard;