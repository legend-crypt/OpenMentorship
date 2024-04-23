import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Hero from './Pages/Hero';
import { Routes, Route } from "react-router-dom";
import Mentors from './Pages/Mentors';
import Profile from './Pages/Profile';
import Verification from './Pages/Verification';
import { fetchActiveUser } from './store/slices/userAuth/userAuthSlice';
import { useSelector, useDispatch } from 'react-redux'
import ProtectedPages from './components/protected/ProtectedPages';
import CallRoom from './Pages/CallRoom';
import HomeHeader from './components/HomeHeader';
import Footer from './components/Footer';
import Meeting from './Pages/Meeting';
import OSProject from './Pages/OSProject';
import Blogs from './Pages/Blogs';
import Blog from './Pages/Blog';
import StudentsRequest from './Pages/StudentsRequest';
function App() {


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
          <Route path="meeting" element={<Meeting />} />
          <Route path="/open-source" element={<OSProject />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog" element={<Blog/>}/>
          <Route path='/student-request' element={<StudentsRequest/>} />
          <Route path='/call-room' element={<CallRoom/>} />
      </Routes>

      {/* <CallRoom/> */}
      {/* <Carousel /> */}
      <Footer />
    </div>
  );
}

export default App;
