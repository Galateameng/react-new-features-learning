import { BrowserRouter, RouterProvider } from "react-router-dom";

import BasicRouter from "./features/MyRouter/01.BasicRouter";
import NestedRouting from "./features/MyRouter/02.NestedRouting";
import QueryParsing from "./features/MyRouter/03.QueryParsing";
import TabsPage from "./features/MyRouter/TabsPage";
import RouterAuth from "./features/MyRouter/RouterAuth";


const routes = [
  ["01.BasicRouter", BasicRouter],
  ["02.NestedRouting", NestedRouting],
  ["03.QueryParsing", QueryParsing],
  // ["TabsPage", TabsPage],
  // ["RouterAuth", RouterAuth],
];


export default function App() {
  return (
    <>
      {routes.map(([label, Component], index) => (
        <div key={index}>
          <h3 style={{borderBottom: '1px solid #000', margin: '20px 0'}}>{label}</h3>
          <Component />
        </div>
      ))}
    </>
  );
}
