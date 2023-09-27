
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Principal from './Principal';
import Sobre from './components/Sobre/Sobre';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/Principal' element={<Principal/>}></Route>
      <Route path='/sobre' element={<Sobre/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
