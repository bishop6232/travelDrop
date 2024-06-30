import './App.css';
import './components.css';
import {Routes, Route} from 'react-router-dom';
import Welcome from './components/Welcome';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import CreateOffer from './components/CreateOffer';
import OfferList from './components/OfferList';
import OfferDetails from './components/OfferDetails';


function App() {
  return (
  
    <>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/welcome' element={<Welcome/>}></Route>
          <Route path='/offerList' element={<OfferList/>}></Route>
          <Route path='/offer/:offerId' element={<OfferDetails/>}></Route>
          <Route path='/createUser' element={<CreateUser/>}></Route>
          <Route path='/createOffer' element={<CreateOffer/>}></Route>
      </Routes>

   </>
  );
}

export default App;
