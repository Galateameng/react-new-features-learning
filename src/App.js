import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route, Outlet,  Link,  useMatch, useResolvedPath } from 'react-router-dom'
import About from './features/about'
import Home from './features/home'
import Counter from './features/counter'
import React18 from './features/react18'

import './app.scss'

const menus = [
  {
    title: 'Home',
    path: '',
    index: true,
    element: Home
  },
  // {
  //   title: 'About',
  //   path: 'about',
  //   index: false,
  //   element: About
  // },
  {
    title: 'Counter',
    path: 'counter',
    index: false,
    element: Counter
  },
  {
    title: 'React',
    path: 'react',
    index: false,
    element: React18
  }
]

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function Layout() {
  return (
    <div className='container'>
      <nav>
        <ul>
          {
            menus.map(item =>(
              <li key={item.title}>
                <CustomLink to={item.path}>{item.title}</CustomLink>
              </li>
            ) )
          }
        </ul>
      </nav>

      <div className='main'>
         <Outlet />
      </div>
    </div>
  );
}

function CustomLink({ children, to, isLeaf, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        to={to}
        {...props}
        className={match ? 'active' : null}
      >
        {children}
      </Link>
    </div>
  );
}

function App() {
  return (
    <Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {menus.map(item => <Route key={item.title} index={item.index} path={item.path} element={<item.element />} />)}
          <Route exact path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </Fragment>
  )
}




export default App