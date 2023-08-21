import PropTypes from 'prop-types';
import Link from '/src/components/atoms/Link';
import Icon from '/src/components/atoms/Icon';
import styles from './NavItem.module.css';

const NavItem = ({ to, text, iconSrc, iconAlt }) => {
  return (
    <li className={styles.navItem}>
      <Link to={to} text={text} />
      <Icon src={iconSrc} alt={iconAlt} />
    </li>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  iconAlt: PropTypes.string.isRequired,
};

export default NavItem;
