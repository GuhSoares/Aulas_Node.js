import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

/* components */
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Container from './components/layouts/Container';
/* pages */
import Home from './components/pages/Auth/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';

function App() {
  return (
    <Router>
    <Navbar />
    <Container>
    <Routes> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
    </Routes>
    </Container>
    <Footer />
    </Router>
  );
}

export default App;
