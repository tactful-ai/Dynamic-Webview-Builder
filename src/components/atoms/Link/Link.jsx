import PropTypes from 'prop-types';
import styles from './Link.module.css';

const Link = ({ to, text }) => {
  return (
    <a href={to} className={styles.link}>
      {text}
    </a>
  );
};

// PropTypes validation
Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Link;
