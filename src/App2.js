import { BrowserRouter, RouterProvider } from "react-router-dom";

import BasicRouter from "./features/MyRouter/01.BasicRouter";
import NestedRouting from "./features/MyRouter/02.NestedRouting";
import QueryParsing from "./features/MyRouter/03.QueryParsing";
import AuthRouter from "./features/MyRouter/04.AuthRouter";
import LazyloadDemo1 from "./features/MyRouter/05-1.lazyload";


const routes = [
  ["01.BasicRouter", BasicRouter],
  ["02.NestedRouting", NestedRouting],
  ["03.QueryParsing", QueryParsing],
  ["04.AuthRouter", AuthRouter],
  ["05-1.LazyloadDemo1", LazyloadDemo1 ],
];


export default function App() {
  return (
    <div style={{padding: 30}}>
      {routes.map(([label, Component], index) => (
        <div key={index}>
          <h3 style={{borderBottom: '1px solid #000', margin: '20px 0'}}>{label}</h3>
          <Component />
        </div>
      ))}
    </div>
  );
}
