import React from 'react';
import Icon from '@availity/icon';
import AvLink from '@availity/link';

const Footer = () => (
  <p className="text-center mt-3">
    Made with
    <Icon title="Click to See Animated Card" name="heart" className="mx-1" color="danger" />
    by
    <AvLink href="https://www.availity.com" target="_blank" className="mx-1">
      Availity
    </AvLink>
    2021
  </p>
);

export default Footer;
