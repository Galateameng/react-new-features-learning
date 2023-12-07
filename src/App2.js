import { BrowserRouter, RouterProvider } from "react-router-dom";

import BasicRouter from "./features/MyRouter/01.BasicRouter";
import NestedRouting from "./features/MyRouter/NestedRouting";
import TabsPage from "./features/MyRouter/TabsPage";
import RouterAuth from "./features/MyRouter/RouterAuth";


const routes = [
  ["BasicRouter", BasicRouter],
  // ["NestedRouting", NestedRouting],
  // ["TabsPage", TabsPage],
  // ["RouterAuth", RouterAuth],
];


export default function App() {
  return (
    <BrowserRouter>
      {routes.map(([label, Component]) => (
        <div>
          <h3 style={{borderBottom: '1px solid #000', margin: '20px 0'}}>{label}</h3>
          <Component />
        </div>
      ))}
    </BrowserRouter>
  );
}
