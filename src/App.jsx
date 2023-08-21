
import {Route ,Routes} from 'react-router-dom'
import {Home} from "./pages/home/Home.jsx"
import { Builder } from './pages/builder/Builder';
import Navbar from './components/organisms/Navbar';

function App(){
  const menuItems = [
    { to: '/home', text: 'Home', iconSrc: '/house-solid.svg', iconAlt: 'Home Icon' },
    { to: '/Builder', text: 'Builder', iconSrc: '/screwdriver-wrench-solid.svg', iconAlt: 'Builder Icon' },
  ];

  return (
    <>
    <div>
      <Navbar menuItems={menuItems} />
    </div>

    <Routes>
    <Route path ="/" element={<Home/>}></Route>
     <Route path ="/home" element={<Home/>}></Route>
     <Route path ="/Builder" element={<Builder/>}></Route>
    
    </Routes>
     </>
  );
}

export default App;