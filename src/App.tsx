import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Bears from "./pages/Bears.tsx";

function App() {
  return (
    <>
        <Routes>
            <Route path={`/`} element={<Home/>}/>
            <Route path={`/bears`} element={<Bears/>}/>
            <Route path={`*`} element={<NotFound/>}/>
        </Routes>
    </>
  )
}

export default App
