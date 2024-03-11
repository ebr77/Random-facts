//App.js
import React, { useState, useEffect } from 'react';
import FactViewer from './FactViewer';
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp'; 
import SavedFacts from './SavedFacts';
import './Styles/App.sass'; 



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Define user state
  const [savedFacts, setSavedFacts] = useState([]);
  const [showSignUp, setShowSignUp] = useState(true);
  

  

  useEffect(() => {
    // Check local storage for authentication status and saved facts
    const authenticated = localStorage.getItem('isAuthenticated');
    const user = JSON.parse(localStorage.getItem('user'));
    const savedFacts = JSON.parse(localStorage.getItem('savedFacts'));

    if (authenticated && user) {
      setIsAuthenticated(true);
      setUser(user);
    }

    if (savedFacts) {
      setSavedFacts(savedFacts);
    }
  }, []);

  const handleSaveFact = (randomFacts) => {
    setSavedFacts([...savedFacts, ...randomFacts]);
    localStorage.setItem('savedFacts', JSON.stringify([...savedFacts, ...randomFacts]));
};

const removeSavedFact = (index) => {
    const updatedSavedFacts = [...savedFacts];
    updatedSavedFacts.splice(index, 1);
    setSavedFacts(updatedSavedFacts);
    localStorage.setItem('savedFacts', JSON.stringify(updatedSavedFacts));
};



////////////////////////////////////////////////////////////////////////////////////////////////////
  const signUp = (username, email, password) => {
    // Simulate user registration
    const newUser = { username, email };
    setUser(newUser);
    setIsAuthenticated(true);
    // after refresh not go to sign in page
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const signIn = (email, password) => {
    // Simulate user authentication
    if (email === 'dummy@example.com' && password === 'aa') {
      const user = ({ username: 'DummyUser', email: 'dummy@example.com' });
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const signOut = () => {
    // Sign out logic
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };
/////////////////////////////////////////////////////////////////////////////////////////////////

const toggleView = () => {
  setShowSignUp(!showSignUp);
};

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? (
          <>
            <button onClick={signOut}>Sign Out</button>
            <FactViewer onSaveFacts={handleSaveFact} savedFacts={savedFacts}/>
            <SavedFacts savedFacts={savedFacts} removeSavedFact={removeSavedFact} />
          </>
          ) : (
          <>
            {showSignUp ? (
              <SignUp signUp={signUp} />
            ) : (
              <SignIn signIn={signIn} />
            )}
              <button className='register' onClick={toggleView}>
                {showSignUp ? 'Already have an account? Sign In' : 'Create an account'}
              </button>
          </>
          )}
      </header>
    </div>
  );
}

export default App;