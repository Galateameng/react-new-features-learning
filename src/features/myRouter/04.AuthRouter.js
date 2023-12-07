import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { fakeAuthProvider } from "./04.auth";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

function AuthStatus() {
  // Get our logged in user, if they exist, from the root route loader data
  let { user } = useRouteLoaderData("root");
  let fetcher = useFetcher();

  if (!user) {
    return <p>你还没有登录，请先登录</p>;
  }

  let isLoggingOut = fetcher.formData != null;

  return (
    <div>
      <p>Welcome {user}!</p>
      <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </div>
  );
}

async function loginAction({ request }) {
  let formData = await request.formData();
  let username = formData.get("username");

  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/");
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

function LoginPage() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData();

  return (
    <div>
      <p>您需要先登录才能看到 该页面（{from}）的内容</p>

      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" />
        </label>{" "}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
    </div>
  );
}

function PublicPage() {
  return <h3>PublicPage 不需要登录就可以看到</h3>;
}

function protectedLoader({ request }) {
  if (!fakeAuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

function ProtectedPage() {
  return <h3>需要登陆才能看见的页面呀～</h3>;
}
