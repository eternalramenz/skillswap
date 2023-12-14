import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SliderCaptcha = ({ onSuccess }) => {
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [targetPosition, setTargetPosition] = useState(getRandomTargetPosition());
  const [captchaImage, setCaptchaImage] = useState(null);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    // Fetch a random image from Unsplash API
    axios.get('https://source.unsplash.com/random')
      .then(response => {
        setCaptchaImage(response.config.url);
      });
  }, []);

  function getRandomTargetPosition() {
    // Generate a random target position for the slider
    return Math.floor(Math.random() * 100);
  }

  const handleSliderChange = () => {
    if (isDragging.current) {
      const newPosition = sliderRef.current.valueAsNumber;
      setSliderPosition(newPosition);
    }
  };

  const handleSliderMouseDown = () => {
    isDragging.current = true;
  };

  const handleSliderMouseUp = () => {
    isDragging.current = false;

    // Set a tolerance level for the correct position
    const tolerance = 5;
    if (Math.abs(sliderPosition - targetPosition) < tolerance) {
      setIsCaptchaSolved(true);
      onSuccess();
    } else {
      setIsCaptchaSolved(false);
      handleReset();
    }
  };

  const handleReset = () => {
    setSliderPosition(0);
    setTargetPosition(getRandomTargetPosition());
    axios.get('https://source.unsplash.com/random')
      .then(response => {
        setCaptchaImage(response.config.url);
      });
  };

  const puzzlePieceStyle = {
    position: 'absolute',
    width: '20%', // Adjust the size of the puzzle piece
    height: '100%',
    maskImage: 'linear-gradient(to right, transparent 50%, #fff 50%)',
    maskSize: '200% 100%', // Adjust the size of the puzzle piece
    transform: `translateX(${targetPosition - 10}%)`, // Adjust initial position of the puzzle piece
  };

  return (
    <div style={{ position: 'relative' }}>
      <p>Slide to the target position:</p>
      {captchaImage && (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={puzzlePieceStyle}></div>
          <img src={captchaImage} alt="Captcha" style={{ width: '100%', maskImage: 'linear-gradient(to right, #fff 50%, transparent 50%)' }} />
        </div>
      )}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        onMouseDown={handleSliderMouseDown}
        onMouseUp={handleSliderMouseUp}
        ref={sliderRef}
        style={{ width: '100%' }}
      />
      <p>Target Position: {targetPosition}</p>
      {isCaptchaSolved ? (
        <p>Captcha solved! 🎉</p>
      ) : (
        <button onClick={handleReset}>Reset</button>
      )}
    </div>
  );
};

export default SliderCaptcha;
