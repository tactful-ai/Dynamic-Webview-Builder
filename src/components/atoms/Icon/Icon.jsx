import PropTypes from 'prop-types'; // Import PropTypes
import styles from './Icon.module.css';

const Icon = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className={styles.icon} />
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Icon;
