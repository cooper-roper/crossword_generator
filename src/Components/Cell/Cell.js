// Cell.js

import React from 'react';
import { useCrosswordContext } from '../../Context/CrosswordContext';
import './Cell.css';

const Cell = ({ cellData, row, col }) => {
    const { handleCellClick, gridSize } = useCrosswordContext();


    /* Cells are made up of a number (only if number > 0) and a character */
    /* If the cell is toggled, then the number and character are hidden */
    return (
        <div
        className={cellData.toggled ? 'toggled' : 'grid-cell'}
        style={{ '--grid-size': gridSize }}
        onClick={() => handleCellClick(row, col)}
        >
            {cellData.toggled ? null :             
            <div>
                <div className="cell-number">
                    {cellData.number > 0 ? cellData.number : null}
                </div>
                <div className="cell-letter">
                    {cellData.letter}
                </div>
            </div>}
        </div>
    );
};

export default Cell;
