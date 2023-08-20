import PropTypes from 'prop-types';
import Link from '/src/components/atoms/Link';
// import Icon from '/src/components/atoms/Icon';
import { NavItemWrapper } from './NavItem.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavItem = ({ icon, label, to }) => {
  return (
    <NavItemWrapper>
      <Link to={to}>
      <FontAwesomeIcon icon={icon} />  {label}
      </Link>
    </NavItemWrapper>
  );
};

NavItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavItem;
