import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { Builder } from "./pages/builder/Builder";
import { NewBuilder } from "./pages/builder/NewBuilder";

import AntdNav from "./components/organisms/AntdNav/AntdNav.jsx";

function App() {
  return (
    <>
      <div>
        <AntdNav>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/Builder" element={<NewBuilder />} />
            <Route path="/Builder/:id" element={<Builder />} />
          </Routes>
        </AntdNav>
      </div>
    </>
  );
}

export default App;
