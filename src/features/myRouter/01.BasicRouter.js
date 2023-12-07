import { Routes, Route, Outlet, Link } from "react-router-dom";

import './01.BasicRouter.scss'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout2 />}>
          <Route index element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
          <Route path="page3" element={<Page3 />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div className="layout1">
      <nav >
        <ul>
          <li>
            <Link to="/">page1</Link>
          </li>
          <li>
            <Link to="/page2">page2</Link>
          </li>
          <li>
            <Link to="/page3">page3</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
}

function Layout2() {
  return (
    <div className="layout2">
      <nav className="nav2">
        <ul>
          <li>
            <Link to="/">page1</Link>
          </li>
          <li>
            <Link to="/page2">page2</Link>
          </li>
          <li>
            <Link to="/page3">page3</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

function Page1() {
  return (
    <div>
      <h2>page1111111</h2>
    </div>
  );
}

function Page2() {
  return (
    <div>
      <h2>page2222222</h2>
    </div>
  );
}

function Page3() {
  return (
    <div>
      <h2>page3333333</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
