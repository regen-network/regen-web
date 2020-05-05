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

const Section = ({ children }: propTypes): JSX.Element => {
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

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Section;
