/**
 * Basic Layout component
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './layout.css';

interface propTypes {
  children: Array<React.ReactElement>;
}

const MenuDropdown = ({ children }: propTypes): JSX.Element => {
  return (
    <div
      style={{
        width: `100%`,
        margin: `0 auto`,
        padding: `1rem`,
      }}
    ></div>
  );
};

MenuDropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuDropdown;
