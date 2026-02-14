import React from 'react';
import Lottie from 'lottie-react';
// import characterAnimation from '../assets/character.json'; // Placeholder path

const Character = ({ state }) => {
    // TODO: Load actual lottie file or use a placeholder URL if local file not available immediately.
    // For now, we will render a placeholder div if lottie source is missing.

    return (
        <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500">Character: {state}</span>
            {/* <Lottie animationData={characterAnimation} loop={true} /> */}
        </div>
    );
};

export default Character;
