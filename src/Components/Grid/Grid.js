// CrosswordGrid.js

import React from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';
import { useCrosswordContext } from '../../Context/CrosswordContext';

const CrosswordGrid = () => {
    const { gridSize, gridData } = useCrosswordContext();

    /* Populate the grid with Cells */

    return (
        <div className='container'>
            <div className="crossword-grid" style={{ '--grid-size': gridSize }}>
                {gridData.map((row, rowIndex) =>
                    row.map((cellData, colIndex) => (
                        <Cell row={rowIndex} col={colIndex} cellData={cellData} />
                    ))
                )}
            </div>
            <div className='text'>
                Created by <a href="https://www.github.com/cooper-roper">Cooper Roper</a>
            </div>
        </div>

    );
};

export default CrosswordGrid;
