import React from 'react';
import { HeartIcon, Link, Typography } from '@availity/element';

const currentYear = new Date().getFullYear() 

const Footer = () => (
  <Typography margin={2} textAlign='center'>
    Made with
    <HeartIcon name="heart" color="error" sx={{marginLeft: 1, marginRight: 1}} />
    by
    <Link href="https://www.availity.com" target="_blank" marginLeft={1} marginRight={1}>
      Availity
    </Link>
    {currentYear}
  </Typography>
);

export default Footer;
