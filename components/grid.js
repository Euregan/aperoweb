import React from 'react';

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

export default Grid;
