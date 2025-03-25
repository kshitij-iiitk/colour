import React, { useState, useEffect } from 'react';
import './styles.css'; 
import './App.css';

function App() {
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  
  const totalBoxes = 9;
  
  const handleBoxClick = (boxId) => {
    if (playingAnimation || clickedBoxes.includes(boxId)) return;
    
    const newClickedBoxes = [...clickedBoxes, boxId];
    setClickedBoxes(newClickedBoxes);
    
    if (newClickedBoxes.length === totalBoxes) {
      setPlayingAnimation(true);
      setAnimationStep(0);
    }
  };
  
  useEffect(() => {
    if (!playingAnimation) return;
    
    if (animationStep < totalBoxes) {
      const timer = setTimeout(() => {
        setAnimationStep(animationStep + 1);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setClickedBoxes([]);
        setPlayingAnimation(false);
        setAnimationStep(0);
      }, 2000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [playingAnimation, animationStep]);
  
  const getBoxColor = (boxId) => {
    if (playingAnimation) {
      const boxIndex = clickedBoxes.indexOf(boxId);
      return boxIndex < animationStep ? 'box-orange' : 'box-green';
    } 
    return clickedBoxes.includes(boxId) ? 'box-green' : 'box-gray';
  };

  return (
    <div className="container">
      
   <div className="header"></div>
      
      <div className="grid-container">
        {Array.from({ length: totalBoxes }, (_, i) => i + 1).map((boxId) => (
          <div
            key={boxId}
            onClick={() => handleBoxClick(boxId)}
            className={`box ${getBoxColor(boxId)}`}
          >
            {boxId}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
