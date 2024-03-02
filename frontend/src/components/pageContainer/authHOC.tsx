import { JwtPayload, jwtDecode } from "jwt-decode";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from ".";

export function AuthHOC(Component: any, name: string) {
  function AuthenticationCheck() {
    const navigate = useNavigate();

    function logOut() {
      localStorage.removeItem("USER_DATA");
      navigate("/login");
    }

    async function checkToken() {
      try {
        const USER_DATA = localStorage.getItem("USER_DATA");
        if (USER_DATA) {
          const token = JSON.parse(USER_DATA).token;
          const payload: JwtPayload = await jwtDecode(token);
          const nowDate = moment(new Date());
          const expDate = moment(new Date((payload.exp ?? 0) * 1000));
          if (moment(nowDate).isAfter(expDate)) {
            logOut();
          }
        } else {
          logOut();
        }
      } catch (error) {
        logOut();
      }
    }

    React.useEffect(() => {
      checkToken();
    }, []);

    const Page: JSX.Element = React.useMemo(() => <Component />, []);

    return Page;
  }

  return (
    <PageContainer title={name}>
      <AuthenticationCheck />
    </PageContainer>
  );
}
