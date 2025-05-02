import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Bears from "./pages/Bears.tsx";
import Header from "./components/header/Header.tsx";
import Test from "./pages/Test.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import AdminManagementPage from "./pages/admin/AdminManagementPage.tsx";

function App() {
  return (
    <>
        <Header/>
        <Routes>
            <Route path={`/`} element={<Home/>}/>
            <Route path={`/bears`} element={<Bears/>}/>
            <Route path={`/login`} element={<LoginPage/>}/>
            <Route path={`/signup`} element={<SignUpPage/>}/>
            <Route path={`/profile`} element={<ProfilePage/>}/>
            <Route path={`/test`} element={<Test/>}/>
            <Route path={`/admin`} element={<AdminManagementPage/>}/>
            <Route path={`*`} element={<NotFound/>}/>
        </Routes>
    </>
  )
}

export default App
