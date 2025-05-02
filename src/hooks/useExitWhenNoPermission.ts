import {useEffect} from "react";
import {getUserInfo} from "../util/storage.ts";
import {NavigateFunction} from "react-router-dom";
import {Role} from "../constants/role.ts";

export const useExitWhenNoPermission = (nav: NavigateFunction, accessibleRole: Role) => {
    useEffect(() => {
        const userInfo = getUserInfo();
        if(!userInfo) {
            if(accessibleRole === Role.NO_ROLE) {
                return;
            }
            nav("/no-permission", {replace: true});
            return;
        }
        if(accessibleRole === Role.NO_ROLE) {
            nav("/", {replace: true});
            return;
        }
        let noPermission: boolean = true;
        if((accessibleRole === Role.ADMIN || accessibleRole === Role.ADMIN_AND_COMPANY || accessibleRole === Role.ALL) && userInfo.role === "ROLE_ADMIN") {
            noPermission = false;
        }
        else if((accessibleRole === Role.COMPANY || accessibleRole === Role.ADMIN_AND_COMPANY || accessibleRole === Role.ALL) && userInfo.role === "ROLE_COMPANY") {
            noPermission = false;
        }
        else if((accessibleRole === Role.APPLICANT || accessibleRole === Role.ALL) && userInfo.role === "ROLE_APPLICANT") {
            noPermission = false;
        }
        if(noPermission) {
            nav("/no-permission", {replace: true});
            return;
        }
    });
}