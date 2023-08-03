// Cell.js

import React from 'react';
import { useCrosswordContext } from '../../Context/CrosswordContext';
import './Cell.css';

const Cell = ({ cellData, row, col }) => {
  const { handleCellClick, gridSize } = useCrosswordContext();

  return (
    <div
      className={cellData.toggled ? 'toggled' : 'grid-cell'}
      style={{ '--grid-size': gridSize }}
      onClick={() => handleCellClick(row, col)}
    >
        {cellData.toggled ? null :             
        <div>
            <div className="cell-number">
                {/* {cellData.number} */}
            </div>
            <div className="cell-letter">
                <p>#</p>
                {/* {cellData.letter} */}
            </div>
        </div>}
    </div>
  );
};

export default Cell;
