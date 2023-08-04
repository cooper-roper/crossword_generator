// CrosswordGrid.js

import React from 'react';
import './Words.css';
import { useCrosswordContext } from '../../Context/CrosswordContext';

const CrosswordGrid = () => {
    const { words } = useCrosswordContext();

    /* Populate the grid with Cells */

    return (
        <div className= "words-container">
            <div className="down">
                <h2>Down</h2>
                <div className="down-words">
                    {words.map((word) => (
                        word.direction === 'down' || word.direction === 'both' ? (
                        <div className="word">
                            {word.number}. {word.answer}- {word.clue}
                        </div>
                        ) : null
                    ))}
                </div>
            </div>
            <div className="across">
                <h2>Across</h2>
                <div className="across-words">
                    {words.map((word) => (
                        word.direction === 'across' || word.direction === 'both' ? (
                        <div className="word">
                            {word.number}. {word.answer}- {word.clue}
                        </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CrosswordGrid;
