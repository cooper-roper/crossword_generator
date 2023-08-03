    // CrosswordContext.js

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const CrosswordContext = createContext();

export const CrosswordProvider = ({ children }) => {
    const [gridSize, setGridSize] = useState(10); // Replace this with your actual grid size
    const [mirroringOptions, setMirroringOptions] = useState({ x: true, y: true });

    useEffect(() => {
        setGridData(createInitialGridData());
    }, [gridSize, mirroringOptions]);

    // Function to create the initial grid data
    const createInitialGridData = () => {
        const initialGridData = Array.from({ length: gridSize }, () =>
            Array.from({ length: gridSize }, () => ({
                letter: '', // Replace with your logic to set the letter for each cell
                toggled: false,
            }))
        );

        return initialGridData;
    };

    const [gridData, setGridData] = useState(createInitialGridData());

    // Function to handle cell clicks and toggle cell states and mirrored cells' states
    const handleCellClick = useCallback((rowIndex, colIndex) => {
        setGridData((prevGridData) => {
        const newGridData = prevGridData.map((row, rowIdx) =>
            row.map((cell, colIdx) =>
            rowIndex === rowIdx && colIndex === colIdx
                ? { ...cell, toggled: !cell.toggled }
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

        return newGridData;
        });
    }, [mirroringOptions, gridSize]);

    return (
        <CrosswordContext.Provider
        value={{
            gridSize,
            setGridSize,
            mirroringOptions,
            setMirroringOptions,
            setGridData,
            gridData,
            handleCellClick,
            createInitialGridData
        }}
        >
        {children}
        </CrosswordContext.Provider>
    );
};

export const useCrosswordContext = () => useContext(CrosswordContext);
