import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ children, id }) => (
    <div className="grid" id={id}>
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
    children: PropTypes.element.isRequired,
    id: PropTypes.string.isRequired,
};

export default Grid;
