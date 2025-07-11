import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/nav.jsx';
import Main from './components/main.jsx';
import About from './components/about.jsx';
import Contact from './components/contact.jsx';
import Footer from './components/footer.jsx';
import Register from './components/register.jsx';
import Services from './components/service.jsx';
import Oneperson from './components/oneperson.jsx'; // Import the new component
import Influencers from './components/influencer.jsx'; // Import the influencer list component
import LoginPage from './components/login.jsx';
import './App.css';

const App = () => {
  return (
    <div>
      <Nav />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Main />} />
        <Route path="/actors" element={<Main />} />
        <Route path="/services" element={<Services />} />
        <Route path="/oneperson/:name" element={<Oneperson />} />
        <Route path="/influencers" element={<Influencers />} />  {/* Only this should remain */}
        <Route path="/pricing" element={<Influencers />} />
        <Route path="/actors" element={<Influencers />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
