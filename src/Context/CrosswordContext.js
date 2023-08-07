import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const CrosswordContext = createContext();

export const CrosswordProvider = ({ children }) => {
    const [gridSize, setGridSize] = useState(10); // Replace this with your actual grid size
    const [mirroringOptions, setMirroringOptions] = useState({ x: true, y: true });

    const getDirection = (row, col, above, left) => {
        if (row === 0 || col === 0 || above || left) {
            //both above and left are true
            if ((row === 0 || above) && (col === 0 || left)) {
                return 'both';
            }
            if (row === 0 || above) {
                return 'down';
            }
            else {
                return 'across';
            }
        }
        else {
            return 'none';
        }
    }

    // Function to create the initial grid data
    const createInitialGridData = useCallback(() => {
        let num = 0;
        const initialGridData = Array.from({ length: gridSize }, (_, row) =>
            Array.from({ length: gridSize }, (_, col) => ({
                pos: {
                    row: row,
                    col: col,
                },
                letter: '', // Replace with your logic to set the letter for each cell
                toggled: false,
                number: (row === 0 || col === 0) ? ++num : 0, // Replace with your logic to set the number for each cell
                direction: getDirection(row, col, false, false),
            }))
        );

        return initialGridData;
    }, [gridSize]);

    const [gridData, setGridData] = useState(createInitialGridData);

    const createInitialWords = useCallback(() => {
        const words = [];
        // go through gridData and add words to words array 
        // word object should have number, direction, clue, answer
        for (let row of gridData) {
            for (let cell of row) {
                if (cell.number > 0) {
                    let word = {
                        number: cell.number,
                        direction: cell.direction,
                        clue: 'Clue',
                        answer: 'Word',
                    }
                    words.push(word);
                }
            }
        }
        
        return words;
    }, [gridData]);

    const [words, setWords] = useState(createInitialWords); // Replace this with your actual words

    // Function to handle cell clicks and toggle cell states and mirrored cells' states
    const handleCellClick = useCallback((rowIndex, colIndex) => {
        setGridData((prevGridData) => {
        const newGridData = prevGridData.map((row, rowIdx) =>
            row.map((cell, colIdx) =>
            rowIndex === rowIdx && colIndex === colIdx
                ? {
                    ...cell,
                    toggled: !cell.toggled,
                } 
                : cell
            )
        );


        if (mirroringOptions.x && mirroringOptions.y) {
            const mirroredRowIndex = gridSize - 1 - rowIndex;
            const mirroredColIndex = gridSize - 1 - colIndex;
            newGridData[mirroredRowIndex][mirroredColIndex].toggled = newGridData[rowIndex][colIndex].toggled;
        }

        else if (mirroringOptions.x) {
            const mirroredRowIndex = rowIndex;
            const mirroredColIndex = gridSize - 1 - colIndex;
            newGridData[mirroredRowIndex][mirroredColIndex].toggled = newGridData[rowIndex][colIndex].toggled;
        }

        else if (mirroringOptions.y) {
            const mirroredRowIndex = gridSize - 1 - rowIndex;
            const mirroredColIndex = colIndex;
            newGridData[mirroredRowIndex][mirroredColIndex].toggled = newGridData[rowIndex][colIndex].toggled;
        }

        let num = 0;

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (newGridData[i][j].toggled) {
                    newGridData[i][j].number = 0;
                }
                else {
                    let above = (i > 0) ? newGridData[i-1][j].toggled : false;
                    let left = (j > 0) ? newGridData[i][j-1].toggled : false;
                    newGridData[i][j].direction = getDirection(i, j, above, left);
                    newGridData[i][j].number = (i === 0 || j === 0 || above || left) ? ++num : 0;
                }
            }
        }

        return newGridData;
        });
    }, [gridSize, mirroringOptions.x, mirroringOptions.y]);

    // Function to send the data to the backend
    const sendDataToBackend = async (topic) => {
        const url = process.env.REACT_APP_BACKEND_URL;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gridData, topic }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Backend response:', responseData);
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }

        setGridData(gridData);
    };

    useEffect(() => {
        setGridData(createInitialGridData());
    }, [gridSize, mirroringOptions, createInitialGridData]);

    useEffect(() => {
        setWords(createInitialWords());
    }, [gridData, createInitialWords]);

  return (
    <CrosswordContext.Provider
      value={{
        gridSize,
        setGridSize,
        mirroringOptions,
        setMirroringOptions,
        gridData,
        handleCellClick,
        createInitialGridData,
        words,
        sendDataToBackend,
      }}
    >
      {children}
    </CrosswordContext.Provider>
  );
};

export const useCrosswordContext = () => useContext(CrosswordContext);
