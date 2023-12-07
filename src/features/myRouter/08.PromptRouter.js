import * as React from "react";
import type {
  unstable_Blocker as Blocker,
  unstable_BlockerFunction as BlockerFunction,
} from "react-router-dom";
import { useActionData } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Form,
  json,
  Link,
  Outlet,
  Route,
  RouterProvider,
  useBlocker,
  useLocation,
} from "react-router-dom";

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<h2>page1</h2>} />
      <Route path="page2" element={<h2>page2</h2>} />
      <Route path="page3" element={<h2>page3</h2>} />
      <Route
        path="page4"
        action={() => json({ ok: true })}
        element={
          <>
            <h2>page4</h2>
            <ImportantForm />
          </>
        }
      />
      <Route path="page5" element={<h2>page5</h2>} />
    </Route>
  )
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function PromptRouter() {
  return <RouterProvider router={router} />;
}

function Layout() {
  let [historyIndex, setHistoryIndex] = React.useState(
    window.history.state?.idx
  );
  let location = useLocation();

  // Expose the underlying history index in the UI for debugging
  React.useEffect(() => {
    setHistoryIndex(window.history.state?.idx);
  }, [location]);

  // Give us meaningful document titles for popping back/forward more than 1 entry
  React.useEffect(() => {
    document.title = location.pathname;
  }, [location]);

  return (
    <>
      <nav>
        <Link to="/">page1</Link>&nbsp;&nbsp;
        <Link to="/page2">page2</Link>&nbsp;&nbsp;
        <Link to="/page3">page3</Link>&nbsp;&nbsp;
        <Link to="/page4">page4 (Form with blocker)</Link>&nbsp;&nbsp;
        <Link to="/page5">page5</Link>&nbsp;&nbsp;
      </nav>
      <p>
        当前位置 (index): {location.pathname} (historyIndex: {historyIndex})
      </p>
      <Outlet />
    </>
  );
}

function ImportantForm() {
  let actionData = useActionData();
  let [value, setValue] = React.useState("");
  // Allow the submission navigation to the same route to go through
  let shouldBlock = React.useCallback(
    ({ currentLocation, nextLocation }) =>
      value !== "" && currentLocation.pathname !== nextLocation.pathname,
    [value]
  );
  let blocker = useBlocker(shouldBlock);

  // Clean the input after a successful submission
  React.useEffect(() => {
    if (actionData?.ok) {
      setValue("");
    }
  }, [actionData]);

  // Reset the blocker if the user cleans the form
  React.useEffect(() => {
    if (blocker.state === "blocked" && value === "") {
      blocker.reset();
    }
  }, [blocker, value]);

  return (
    <>
      <p>
        表单是否改变?
        {value !== "" ? (
          <span style={{ color: "red" }}>Yes</span>
        ) : (
          <span style={{ color: "green" }}>No</span>
        )}
      </p>

      <Form method="post">
        <label>
          Enter some important data:
          <input
            name="data"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </Form>

      {blocker ? <ConfirmNavigation blocker={blocker} /> : null}
    </>
  );
}

function ConfirmNavigation({ blocker }) {
  if (blocker.state === "blocked") {
    return (
      <>
        <p style={{ color: "red" }}>
          截断了到 {blocker.location.pathname}的跳转
        </p>
        <button onClick={() => blocker.proceed?.()}>就要跳转</button>
        <button onClick={() => blocker.reset?.()}>留在本页</button>
      </>
    );
  }

  if (blocker.state === "proceeding") {
    return (
      <p style={{ color: "orange" }}>Proceeding through blocked navigation</p>
    );
  }

  return <p style={{ color: "green" }}>Blocker is currently unblocked</p>;
}
