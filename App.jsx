import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chatbotfrontend from './components/Chatbotfrontend';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
 


  return (
    <>
      <Chatbotfrontend/>
      {/* Define your routes */}
      <Router >
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>


        </Routes>
      </Router>
      <Navbar />
     


     
 
    </>
  )
}


export default App