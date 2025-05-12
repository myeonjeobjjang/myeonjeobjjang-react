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
import AdminIndustryCreatePage from "./pages/admin/AdminIndustryCreatePage.tsx";
import IndustryListPage from "./pages/applicant/industry/IndustryListPage.tsx";
import IndustryInfoPage from "./pages/applicant/industry/IndustryInfoPage.tsx";
import NoPermissionPage from "./pages/NoPermissionPage.tsx";
import IndustryPage from "./pages/applicant/industry/IndustryPage.tsx";
import SiteMapPage from "./pages/SIteMapPage.tsx";
import CreateCompanyPage from "./pages/company/company/CreateCompanyPage.tsx";
import CompanyInfoPage from "./pages/applicant/company/CompanyInfoPage.tsx";
import MyCompanyListPage from "./pages/company/company/MyCompanyListPage.tsx";
import CompanyPage from "./pages/applicant/company/CompanyPage.tsx";
import CompanyEditPage from "./pages/company/company/CompanyEditPage.tsx";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={`/`} element={<Home/>}/>
                <Route path={`/bears`} element={<Bears/>}/>
                <Route path={`/site-map`} element={<SiteMapPage/>}/>
                <Route path={`/login`} element={<LoginPage/>}/>
                <Route path={`/signup`} element={<SignUpPage/>}/>
                <Route path={`/profile`} element={<ProfilePage/>}/>
                <Route path={`/test`} element={<Test/>}/>

                <Route path={`/admin`} element={<AdminManagementPage/>}/>
                <Route path={`/admin/industry/create`} element={<AdminIndustryCreatePage/>}/>

                <Route path={`/industry`} element={<IndustryPage/>}/>
                <Route path={`/industry/:industryNumber`} element={<IndustryInfoPage/>}/>
                <Route path={`/industry/list`} element={<IndustryListPage/>}/>

                <Route path={`/company`} element={<CompanyPage/>}/>
                <Route path={`/company/create`} element={<CreateCompanyPage/>}/>
                <Route path={`/company/:companyNumber`} element={<CompanyInfoPage/>}/>
                <Route path={`/company/list-mine`} element={<MyCompanyListPage/>}/>
                <Route path={`/company/:companyNumber/edit`} element={<CompanyEditPage/>}/>

                <Route path={`/no-permission`} element={<NoPermissionPage/>}/>
                <Route path={`/not-found`} element={<NotFound/>}/>
                <Route path={`*`} element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default App
