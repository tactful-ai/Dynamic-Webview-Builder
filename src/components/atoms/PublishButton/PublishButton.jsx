import PropTypes from 'prop-types';
import './PublishButton.css';

const PublishButton = ({ onClick }) => {
  return (
    <button className="publish-button" onClick={onClick}>
      Publish
    </button>
  );
};

PublishButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PublishButton;
