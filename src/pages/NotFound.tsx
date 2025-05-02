import usePageTitle from "../hooks/usePageTitle.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const NotFound = () => {
    const nav = useNavigate();
    useEffect(() => {
        if(location.pathname !== "/not-found") {
            nav("/not-found", {replace: true});
        }
    }, [location.pathname])
    usePageTitle(`페이지를 찾을 수 없음`);
    return (
        <div className={`Not_Found`}>
            Not Found
        </div>
    )
}

export default NotFound;