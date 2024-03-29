import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

/* components */
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Container from './components/layouts/Container';
import Message from './components/layouts/Message';

/* pages */
import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Profile from './components/pages/User/Profile';
import MyPets from './components/pages/Pet/MyPets';
import AddPet from './components/pages/Pet/AddPet'
import EditPet from './components/pages/Pet/EditPet'
import PetDatails from './components/pages/Pet/PetDatails'
import MyAdoptions from './components/pages/Pet/MyAdoptions'

/* context */
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
    <Navbar />
    <Message />
    <Container>
    <Routes> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/pet/mypets" element={<MyPets />} />
      <Route path="/pet/add" element={<AddPet />} />
      <Route path="/pet/edit/:id" element={<EditPet />} />
      <Route path="/pet/myadoptions" element={<MyAdoptions />} />
      <Route path="/pet/:id" element={<PetDatails />} />
      <Route path="/" element={<Home />} />
    </Routes>
    </Container>
    <Footer />
   </UserProvider>
    </Router>
  );
}

export default App;
