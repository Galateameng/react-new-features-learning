import { Outlet, Link, useRoutes, useParams, BrowserRouter } from "react-router-dom";

export default function NestedRoutingWrapper () {
  return (
    <BrowserRouter>
      <NestedRouting />
    </BrowserRouter>
  )
}

function NestedRouting() {
  let routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Page1 /> },
        {
          path: "/page2",
          element: <Page2 />,
          children: [
            // { index: true, element: <Page2Index /> },
            { path: "/page2/:id", element: <Course /> },
          ],
        },
        { path: "*", element: <NoMatch /> },
      ],
    },
  ];

  let element = useRoutes(routes);

  return (
    <>
      {element}
    </>
  );
}



function Layout() {
  return (
    <div className="layout1">
      <nav>
        <ul>
          <li>
            <Link to="/">page1</Link>
          </li>
          <li>
            <Link to="/page2">page2</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function Page1() {
  return (
    <div>
      <h2>page111111</h2>
    </div>
  );
}

function Page2() {
  return (
    <div>
      <h2>page222222的一些公共内容。。。。</h2>
      <Page2Index />
      <Outlet />
    </div>
  );
}

function Page2Index() {
  return (
    <div>
      <p>Page2 默认Index</p>

      <nav>
        <ul style={{display: 'flex'}}>
          <li>
            <Link to="page2-1">业务1</Link>
          </li>
          <li>
            <Link to="page2-2">业务2</Link>
          </li>
          <li>
            <Link to="page2-3">业务3</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Course() {
  let { id } = useParams();

  return (
    <div>
      <h2>
        这是具体的业务页面 {id}
      </h2>

      {/* <Link to="/page2">回到page2的业务列表</Link> */}
    </div>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
