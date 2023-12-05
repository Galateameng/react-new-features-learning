import { useState } from "react";
import { Button } from "antd";
import { Route, Link } from "react-router-dom";

const Page1 = () => "Page 1";
const Page2 = () => "Page 2";
const UnauthedPage = () => (
  <span style={{ color: "red" }}>Unauthorized, please log in first.</span>
);
export default () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const routes = loggedIn
    ? [
        {
          path: "/15/RouterAuth",
          component: Page1,
        },
        {
          path: "/15/RouterAuth/page1",
          component: Page1,
        },
        {
          path: "/15/RouterAuth/page2",
          component: Page2,
        },
      ]
    : [{ path: "/15/RouterAuth", component: UnauthedPage }];

  return (
    <div>
      <h1>Router Auth</h1>
      <Button
        type={loggedIn ? "primary" : ""}
        onClick={() => setLoggedIn((v) => !v)}
      >
        {loggedIn ? "Log Out" : "Log In"}
      </Button>

      <div className="exp-15-router-auth">
        <div className="exp-15-sider">
          <Link to="/15/RouterAuth/page1">Page 1</Link>
          <Link to="/15/RouterAuth/page2">Page 2</Link>
        </div>
        <div className="exp-15-page-container">
          {routes.map((r) => (
            <Route path={r.path} component={r.component} />
          ))}
        </div>
      </div>
    </div>
  );
};
