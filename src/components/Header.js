import React from 'react';
import nordSwLogo from '../images/nordSwLogo.jpg';

const Header = props =>
<header className='header'>
  <img src={nordSwLogo} className="logo" alt="logo" />
  <h1 className='title'>Nord Software</h1>
</header>;

export default Header;
