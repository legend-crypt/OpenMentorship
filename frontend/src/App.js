import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Hero from './Pages/Hero';
import { Routes, Route } from "react-router-dom";
import Mentors from './Pages/Mentors';
import Profile from './Pages/Profile';
import Verification from './Pages/Verification';
import ProtectedPages from './components/protected/ProtectedPages';
import CallRoom from './Pages/CallRoom';
import Footer from './components/Footer';
import Meeting from './Pages/Meeting';
import OSProject from './Pages/OSProject';
import Blogs from './Pages/Blogs';
import Blog from './Pages/Blog';
import StudentsRequest from './Pages/StudentsRequest';
import CreateBlog from './Pages/CreateBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import NotFound from './Pages/NotFound';


function App() {
  return (
    <div className="App">
      <NavBar />
      <div><ToastContainer /></div>
      <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={<ProtectedPages Component={<Profile />} />} />
          <Route path="/verification" element={<Verification />} />  
          <Route path="mentors/" element={<ProtectedPages Component={<Mentors />} />} />
          <Route path="/meeting" element={<ProtectedPages Component={<Meeting />} />} />
          <Route path="/student-request" element={<ProtectedPages Component={<StudentsRequest />} />} />
          <Route path="/call-room" element={<ProtectedPages Component={<CallRoom />} />} />
          <Route path="/open-source" element={<OSProject />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:blogId" element={<Blog/>}/>
          <Route path='/create-blog' element={<ProtectedPages Component={<CreateBlog />} />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
