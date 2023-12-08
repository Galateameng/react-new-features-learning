import {BrowserRouter, createBrowserRouter, RouterProvider, Routes, Route, Outlet, Link, NavLink, useMatch, useResolvedPath, } from "react-router-dom";

import './01.BasicRouter.scss'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout2 />,
//     errorElement: <NoFound />, // 404
//     children: [
//       {
//         path: "/",
//         index: true,
//         key: "page1",
//         element: <Page1 />
//       },
//       {
//         path: "/page2",
//         key: "page2",
//         element: <Page2 />
//       },
//       {
//         path: "/page3",
//         key: "page3",
//         element: <Page3 />
//       }
//     ]
//   }
  
// ]);


// export default function RouterDemo() {
//   return (
//     <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
//   );
// }

export default function RouterDemo() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
          <Route path="page3" element={<Page3 />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
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
            <NavLink activeClass="active" to="/">page1</NavLink>
          </li>
          <li>
            <NavLink activeClass="active" to="/page2">page2</NavLink>
          </li>
          <li>
            <NavLink activeClass="active" to="/page3">page3</NavLink>
          </li>
          <li>
            <NavLink activeClass="active" to="/nothing-here">Nothing Here</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && "(active)"}
    </div>
  );
}

function Layout3() {
  return (
    <div className="layout3">
      <nav >
        <ul>
          <li>
            <CustomLink to="/">page1</CustomLink>
          </li>
          <li>
            <CustomLink to="/page2">page2</CustomLink>
          </li>
          <li>
            <CustomLink to="/page3">page3</CustomLink>
          </li>
          <li>
            <CustomLink to="/nothing-here">Nothing Here</CustomLink>
          </li>
        </ul>
      </nav>

      <div className="page-container">
        <Outlet />
      </div>
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
      <h2>No Match here</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function NoFound () {
  return (
    <div>Not Found 404....</div>
  )
}
