import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';
import Link from '@availity/link';

const Footer = ({ toggleFlippable }) => (
  <p className="text-center mt-3">
    Made with <Icon title="Click to See Animated Card" name="heart" color="danger" onClick={toggleFlippable} />{' '}
    by{' '}
    <Link href="https://www.availity.com" url="https://www.availity.com" target="_blank">
      Availity
    </Link>{' '}
    2019
  </p>
);

Footer.propTypes = {
  toggleFlippable: PropTypes.func,
};

export default Footer;
