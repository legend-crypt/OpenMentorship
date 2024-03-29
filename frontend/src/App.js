import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Hero from './Pages/Hero';
import { Routes, Route } from "react-router-dom";
import Mentors from './Pages/Mentors';
import Profile from './Pages/Profile';
import Verification from './Pages/Verification';
import { useEffect } from 'react';
import { fetchActiveUser } from './store/slices/userAuth/userAuthSlice';
import { useSelector, useDispatch } from 'react-redux'
import ProtectedPages from './components/protected/ProtectedPages';
import CallRoom from './Pages/CallRoom';
import Carousel from './components/Carousel';
import HomeHeader from './components/HomeHeader';
import Footer from './components/Footer';

function App() {

  const dispatch = useDispatch();
  const {loginStatus} = useSelector((state)=> state.userAuth)
  useEffect(()=>{
     dispatch(fetchActiveUser())
  },[dispatch, loginStatus])


  return (
    <div className="App">
      <HomeHeader />
      <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={<ProtectedPages Component={<Profile />} />} />
          <Route path="/verification" element={<Verification />} />  
          <Route path="mentors/*" element={<ProtectedPages Component={<Mentors />} />} />
      </Routes>
      {/* <Profile/> */}
      {/* <CallRoom/> */}
      {/* <Carousel /> */}
      <Footer />
    </div>
  );
}

export default App;
