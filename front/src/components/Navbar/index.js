import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import CartButton from './CartButton/index';

import {
  mainPath, catalogPath, aboutPath, contactPath, cartPath
} from '~/src/helpers/routes';

const Navbar = () => (
  <Menu secondary>
    <Menu.Item as={NavLink} to={mainPath()} exact strict header content='React Shop'/>
    <Menu.Item as={NavLink} to={catalogPath()} exact content='Catalog'/>
    <Menu.Item as={NavLink} to={aboutPath()} content='About'/>
    <Menu.Item as={NavLink} to={contactPath()} content='Contact'/>
    <Menu.Menu position='right'>
      <Menu.Item as={NavLink} to={cartPath()} >
        <CartButton />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default Navbar;
