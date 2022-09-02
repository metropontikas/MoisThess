import { Route, Routes } from "react-router-dom";

import Menu from "./Components/Menu/Menu";
import Home from "./pages/Home";
import "./App.scss";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route index path="Home" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Menu />
    </>
  );
}

export default App;
