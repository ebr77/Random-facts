// SavedFacts.js
import React from 'react';
import './Styles/SavedFacts.sass';

const SavedFacts = ({ savedFacts, removeSavedFact }) => {
    return (
        <div className='saved-facts-container'>
            <h2>Saved Facts</h2>
            {savedFacts.map((fact, index) => (
                <div className= "key" key={index}>
                    <p>{fact}</p>
                    <button onClick={() => removeSavedFact(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default SavedFacts;