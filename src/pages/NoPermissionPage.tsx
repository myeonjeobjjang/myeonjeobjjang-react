import usePageTitle from "../hooks/usePageTitle.ts";

const NoPermissionPage = () => {
    usePageTitle(`접근 권한 없음`);
    return (
        <>
            NoPermissionPage<br/>
            해당 페이지에 접근할 권한이 없습니다.
        </>
    )
}

export default NoPermissionPage;