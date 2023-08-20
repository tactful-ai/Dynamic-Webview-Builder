import PropTypes from 'prop-types';
import { LinkWrapper } from './Link.styles';

const Link = ({ to, children, target, rel }) => {
  return (
    <LinkWrapper href={to} target={target} rel={rel}>
      {children}
    </LinkWrapper>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string,
};

Link.defaultProps = {
  target: '_self',
  rel: 'noopener noreferrer',
};

export default Link;
