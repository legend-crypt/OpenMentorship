<<<<<<< HEAD
import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Hero from './Pages/Hero';
import { Routes, Route } from "react-router-dom";
import Mentors from './Pages/Mentors';
import Profile from './Pages/Profile';
import Verification from './Pages/Verification';
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> py-version-change-to-12

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
    <Routes>
      <Route path="/" element={ <Hero/> } />
      <Route path="/signIn" element={ <SignIn/> } />
      <Route path="/signUp" element={ <SignUp/> } />
      <Route path="/profile" element={ <Profile/> } />
      <Route path="/verification" element={ <Verification/> } />
      <Route path="mentors/*" element={ <Mentors />}>
      </Route>
    </Routes>
    {/* <Profile/> */}
=======
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
>>>>>>> py-version-change-to-12
    </div>
  );
}

export default App;
