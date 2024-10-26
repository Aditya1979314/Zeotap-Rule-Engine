import { Navbar } from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateRule } from './pages/CreateRule';
import { CombineRule } from './pages/CombineRule';
import { UseRule } from './pages/UseRule';
import { User } from './pages/User';

function App() {
  return (
   <div className="bg-[#0A0E0F] min-h-screen">
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/create' element={<CreateRule/>}/>
    <Route path='/combine' element={<CombineRule/>}/>
    <Route path='/use' element={<UseRule/>}/>
    <Route path='/user' element={<User/>}/>
   </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;
