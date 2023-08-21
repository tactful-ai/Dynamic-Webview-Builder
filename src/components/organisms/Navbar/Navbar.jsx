import NavItem from '/src/components/molecules/NavItem';
import styles from './Navbar.module.css';
import PropTypes from 'prop-types';


const Navbar = ({ menuItems }) => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            to={item.to}
            text={item.text}
            iconSrc={item.iconSrc}
            iconAlt={item.iconAlt}
          />
        ))}
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      iconSrc: PropTypes.string.isRequired,
      iconAlt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
