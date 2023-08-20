import PropTypes from 'prop-types';
import { IconWrapper } from './Icon.styles';

const Icon = ({ name }) => {
  return <IconWrapper className={`icon-${name}`} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
