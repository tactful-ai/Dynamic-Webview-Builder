
import {Route ,Routes} from 'react-router-dom'
import {Home} from "./pages/home/Home.jsx"
import { Builder } from './pages/builder/Builder';
import Navbar from './components/organisms/Navbar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = () => {
  const menuItems = [
    { icon: 'home', label: 'Home', to: '/home' },
    { icon: 'ℹ️', label: 'About', to: '/Builder' },
    // ... other menu items
  ];

  return (
    <>

    <Navbar menuItems={menuItems} />

    <Routes>
    <Route path ="/" element={<Home/>}></Route>
     <Route path ="/home" element={<Home/>}></Route>
     <Route path ="/Builder" element={<Builder/>}></Route>
    
    </Routes>
     </>
  );
};

export default App;

// function App(){
  
//   return(
//   <>
//   {/* <Navbar></Navbar> */}
//   <Routes>
//     <Route path ="/home" element={<Home/>}></Route>
//     <Route path ="/Builder" element={<Builder/>}></Route>

//   </Routes>
//   </>
//   );
// }

// export default App;