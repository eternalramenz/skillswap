import React from 'react';

const CheckBox = ({ setState, state }) => {
  const toggleCheck = () => {
    setState(!state);
  };

  return (
    <div
      onClick={toggleCheck}
      className={`w-4 h-4 ring-blue-500 rounded-md cursor-pointer transition-transform flex items-center justify-center ${
        state ? 'ring-1 scale-110' : 'ring-1 ring-blue-500'
      }`}
    >
      <div
        className={`rounded bg-Primary w-3 h-3 transition-opacity ${
          state ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </div>
  );
};

export default CheckBox;
