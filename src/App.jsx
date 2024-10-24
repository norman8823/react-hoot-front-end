import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authserviceimport HootForm from './components/HootForm/HootForm';
import HootList from './components/HootList';
import HootForm from './components/HootForm/HootForm'
import * as hootService from './services/hootService';
import HootDetails from './components/HootDetails/HootDetails';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [hoots, setHoots] = useState([]);

  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddHoot = async (hootFormData) => {
    console.log('hootFormData', hootFormData);
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate('/hoots')  
  };

  const handleDeleteHoot = async (hootid)=> {
    const deletedHoot = await hootService.deleteHoot(hootid);
    setHoots(hoots.filter((hoot)=> hoot._id !== deletedHoot._id));
    navigate('/hoots');
  };

  const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    console.log('hootId:', hootId, 'hootFormData:', hootFormData);
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
  };
  
useEffect(() => {
  const fetchAllHoots = async () => {
    const hootsData = await hootService.index();
    // Set state:
    setHoots(hootsData);
  };
  if (user) fetchAllHoots();
}, [user]);

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
  
  {user ? (
    
    <>
      <Route path="/" element={<Dashboard user={user} />} />
      <Route path="/hoots" element={<HootList hoots={hoots} />} />
      <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot} />} />
      <Route path="/hoots/:hootid" element={<HootDetails handleDeleteHoot={handleDeleteHoot} />} />
      <Route path="/hoots/:hootId/edit" element={<HootForm handleUpdateHoot={handleUpdateHoot} />} />
    </>
  ) : (
    
    <Route path="/" element={<Landing />} />
  )}
  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
</Routes>
      </AuthedUserContext.Provider>
    </>
  );
};


export default App;
