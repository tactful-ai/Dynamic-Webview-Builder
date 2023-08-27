
import {Route ,Routes} from 'react-router-dom'
import {Home} from "./pages/home/Home.jsx"
import { Builder } from './pages/builder/Builder';
import AntdNav from './components/organisms/AntdNav/AntdNav.jsx';


function App(){
  return (
    <>
      <div>
        <AntdNav>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/Builder' element={<Builder />}></Route>
          </Routes>
        </AntdNav>
      </div>
    </>
  );
}

export default App;