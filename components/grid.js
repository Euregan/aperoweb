import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ children }) => (
    <div className="grid">
        {children}

        <style>
            {`
        .grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          column-gap: 0.5rem;
          row-gap: 0.5rem;
        }
      `}
        </style>
    </div>
);

Grid.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Grid;
