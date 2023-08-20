import PropTypes from 'prop-types';
import NavItem from '/src/components/molecules/NavItem';
import { NavbarWrapper } from './Navbar.styles';

const Navbar = ({ menuItems }) => {
  return (
    <NavbarWrapper>
      <ul>
        {menuItems.map((item, index) => (
          <NavItem key={index} icon={item.icon} label={item.label} to={item.to} />
        ))}
      </ul>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
