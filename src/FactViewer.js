//FactViewer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/FactViewer.sass';

const FactViewer = ({ onSaveFacts, savedFacts   }) => {
    const [language, setLanguage] = useState('en'); // Default language is English
    const [fact, setFact] = useState('');
    const [randomFacts, setRandomFacts] = useState([]);

    useEffect(() => {
        fetchRandomFact();
    }, [language]); // Fetch new random fact when language changes

    const fetchRandomFact = async () => {
        try {
            const response = await axios.get(`https://uselessfacts.jsph.pl/api/v2/facts/random?language=${language}`);
            setFact(response.data.text);
        } catch (error) {
            console.error('Error fetching random fact:', error);
        }
    };
    

    const fetchFactOfTheDay = async () => {
        try {
            const response = await axios.get(`https://uselessfacts.jsph.pl/api/v2/facts/today?language=${language}`);
            setFact(response.data.text);
        } catch (error) {
            console.error('Error fetching fact of the day:', error);
        }
    };
    

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleAddToBasket = () => {
        if (fact.trim() !== '') {
        console.log('Fact to be added:', fact);
        //onAddFact(fact); // Call the onAddFact function passed from the parent
        setRandomFacts([...randomFacts, fact]); // Update the state with the added random fact
        setFact('');
        }
    };

    const removeRandomFact = (index) => {
        const updatedFacts = [...randomFacts];
        updatedFacts.splice(index, 1);
        setRandomFacts(updatedFacts);
      };

      const handleSaveFact = () => {
        onSaveFacts(randomFacts); // Save all the added random facts
        setRandomFacts([]); // Clear the added random facts after saving
        localStorage.setItem('savedFacts', JSON.stringify([...savedFacts, ...randomFacts]));
    };

      

    
    return (
        <div className="FactViewer-container">
            <div className='RandomFact-container'>
                <h1 className="FactViewer-header">Random Fact Viewer</h1>
                <div>
                    <label className="language" htmlFor="languageSelect">Choose a language:</label>
                    <select id="languageSelect" value={language} onChange={handleLanguageChange}>
                        <option value="en">English</option>
                        <option value="de">German</option>
                    </select>
                </div>
                <div>
                    <button onClick={fetchRandomFact}>Get Random Fact</button>
                    <button onClick={fetchFactOfTheDay}>Get Fact of the Day</button>
                    <h3>Random Fact: </h3>
                    <p>{fact}</p>
                    <button onClick={handleAddToBasket}>Add to Basket</button>
                </div>
            </div>    
                <div className='added-random'>
                    <h2>Added Random Facts</h2>
                    <ul>
                        {randomFacts.map((fact, index) => (
                            <li key={index}>
                                {fact}
                                <button onClick={() => removeRandomFact(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSaveFact}>Save</button>
                </div>
        </div>
    );
};
export default FactViewer;
