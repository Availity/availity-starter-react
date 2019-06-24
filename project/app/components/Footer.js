import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';

const Footer = ({ toggleFlippable }) => (
  <p className="text-center mt-3">
    Made with <Icon title="Click to See Animated Card" name="heart" color="danger" onClick={toggleFlippable} /> by <a href="http://www.availity.com">Availity</a> 2018
  </p>
);

Footer.propTypes = {
    toggleFlippable: PropTypes.func
}

export default Footer;