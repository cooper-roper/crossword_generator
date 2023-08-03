// CrosswordGrid.js

import React from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';
import { useCrosswordContext } from '../../Context/CrosswordContext';

const CrosswordGrid = () => {
    const { gridSize, gridData } = useCrosswordContext();

    return (
        <div className="crossword-grid" style={{ '--grid-size': gridSize }}>
            {gridData.map((row, rowIndex) =>
                row.map((cellData, colIndex) => (
                    <Cell row={rowIndex} col={colIndex} cellData={cellData} />
                ))
            )}
        </div>
    );
};

export default CrosswordGrid;
