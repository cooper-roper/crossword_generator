import React, { useState } from 'react';
import './Configurations.css';
import { useCrosswordContext } from '../../Context/CrosswordContext';

const Configurations = () => {
    const { gridSize, setGridSize, mirroringOptions, setMirroringOptions, sendDataToBackend } = useCrosswordContext();

    // Local state to store the values of the inputs
    const [localGridSize, setLocalGridSize] = useState(gridSize);
    const [localMirroredX, setLocalMirroredX] = useState(mirroringOptions.x);
    const [localMirroredY, setLocalMirroredY] = useState(mirroringOptions.y);
    const [showTextInput, setShowTextInput] = useState(false);
    const [localTopic, setLocalTopic] = useState('');
  


    // handle the changes in the input fields
    // set the local state to the new value
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

    const handleCheckboxChange = (event) => {
        const newValue = event.target.checked;
        setShowTextInput(newValue);
    };

    const handleTopic = (event) => {
        const newValue = String(event.target.value);
        setLocalTopic(newValue);
    };

    // handle the save changes button
    const handleSaveChanges = () => {
        setGridSize(localGridSize);
        setMirroringOptions({ x: localMirroredX, y: localMirroredY });
        // Handle the topic as you need (e.g., store it in context or use it for puzzle generation)
    };

    const Submit = () => {
        let topic = '';
        if(!showTextInput) topic = localTopic;
        sendDataToBackend(topic);
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
            <label>
                Crossword Theme:
                <input type="checkbox" checked={showTextInput} onChange={handleCheckboxChange} />
                {showTextInput && <input type="text" value={localTopic} onChange={handleTopic}/>}
            </label>
            <button onClick={Submit}>Submit</button>
        </div>
    );
};

export default Configurations;
