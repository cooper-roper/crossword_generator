import React, { useState } from 'react';
import './Configurations.css';
import { useCrosswordContext } from '../../Context/CrosswordContext';

const Configurations = () => {
    const { gridSize, setGridSize, mirroringOptions, setMirroringOptions } = useCrosswordContext();

    const [localGridSize, setLocalGridSize] = useState(gridSize);
    const [localMirroredX, setLocalMirroredX] = useState(mirroringOptions.x);
    const [localMirroredY, setLocalMirroredY] = useState(mirroringOptions.y);

    const handleGridSizeChange = (event) => {
        const newSize = parseInt(event.target.value);
        if (newSize >= 5 && newSize <= 10) {
            setLocalGridSize(newSize);
        }
    };

    const handleMirroredXChange = (event) => {
        const newValue = event.target.checked;
        setLocalMirroredX(newValue);
    };

    const handleMirroredYChange = (event) => {
        const newValue = event.target.checked;
        setLocalMirroredY(newValue);
    };

    const handleSaveChanges = () => {
        setGridSize(localGridSize);
        setMirroringOptions({ x: localMirroredX, y: localMirroredY });
        // Handle the topic as you need (e.g., store it in context or use it for puzzle generation)
    };

    return (
        <div className="configurations">
        <h2>Configurations</h2>
        <label>
            Grid Size (5-10):
            <input type="number" value={localGridSize} onChange={handleGridSizeChange} min={5} max={10} />
        </label>
        <label>
            Mirrored X:
            <input type="checkbox" checked={localMirroredX} onChange={handleMirroredXChange} />
        </label>
        <label>
            Mirrored Y:
            <input type="checkbox" checked={localMirroredY} onChange={handleMirroredYChange} />
        </label>
        <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default Configurations;
