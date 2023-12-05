import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MyRouter from "./features/MyRouter/MyRouter";
import NestedRouting from "./features/MyRouter/NestedRouting";
import TabsPage from "./features/MyRouter/TabsPage";
import RouterAuth from "./features/MyRouter/RouterAuth";
// import LazyLoad from "./16/LazyLoad";
// import Debounce from "./19/Debounce";
import  './app2.scss'

const routes = [
  ["MyRouter", MyRouter],
  ["NestedRouting", NestedRouting],
  ["TabsPage", TabsPage, "/:activeTab?"],
  ["RouterAuth", RouterAuth],
];
const Empty = () => "";
export default function App() {
  return (
    <Router>
      <div className="app">
        <Empty />
        <ul className="sider">
          {routes.map(([label]) => (
            <li key={label}>
              <Link to={`/${label.replace(" ", "/")}`}>{label}</Link>
            </li>
          ))}
        </ul>
        <div id="pageContainer" className="page-container">
          <Routes>
            {routes.map(([label, Component, additionalRoute = ""]) => (
              <Route
                key={label}
                path={`/${label.replace(" ", "/")}${additionalRoute}`}
                element={<Component />}
              >
                
              </Route>
            ))}
            <Route path="/" exact element={<h1>Welcome!</h1>}>
            </Route>
            <Route path="*">Page not found.</Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
