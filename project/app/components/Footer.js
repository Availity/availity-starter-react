import React from 'react';
import Icon from '@availity/icon';
import AvLink from '@availity/link';

const currentYear = new Date().getFullYear() 

const Footer = () => (
  <p className="text-center mt-3">
    Made with
    <Icon name="heart" className="mx-1" color="danger" />
    by
    <AvLink href="https://www.availity.com" target="_blank" className="mx-1">
      Availity
    </AvLink>
    {currentYear}
  </p>
);

export default Footer;
