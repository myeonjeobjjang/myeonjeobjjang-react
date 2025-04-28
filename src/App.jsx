import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Bears from "./pages/Bears";

function App() {
    return (
        <>
            <Routes>
                <Route path={`/`} element={<Home/>}/>
                <Route path={`/bears`} element={<Bears/>}/>
                <Route path={`*`} element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
