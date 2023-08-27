import PropTypes from 'prop-types';
import Link from '/src/components/atoms/Link';
import styles from './NavItem.module.css';

const NavItem = ({ to, text, iconSrc }) => {
  return (
    <li className={styles.navItem}>
      <Link to={to} text={text} />
      {iconSrc}
    </li>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
};

export default NavItem;
