
import {Route ,Routes} from 'react-router-dom'
import {Home} from "./pages/home/Home.jsx"
import { Builder } from './pages/builder/Builder';
import Navbar from './components/organisms/Navbar';
import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import AntdNav from './components/organisms/AntdNav/AntdNav.jsx';


const menuItems = [
  { to: '/home', text: 'Home', iconSrc: <UserOutlined /> },
  { to: '/Builder', text: 'Builder', iconSrc: <VideoCameraOutlined />},
];

function App(){
  return (
    <>
    <div>
      <AntdNav></AntdNav>
      {/* <Navbar menuItems={menuItems} /> */}
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