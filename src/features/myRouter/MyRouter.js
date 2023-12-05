import { useHash } from "react-use";
import _ from "lodash";
const Page1 = () => "Page 1";
const Page2 = () => "Page 2";
const Page3 = () => "Page 3";
const Page4 = () => "Page 4";

const MyRouter = ({ children }) => {
  const routes = _.keyBy(
    children.map((c) => c.props),
    "path",
  );
  const [hash] = useHash();
  const Page = routes[hash.replace("#", "")]?.component;
  return Page ? <Page /> : "Not found.";
};

const Route = () => null;
export default () => {
  return (
    <>
      <h1>My Router</h1>
      <div className="exp-15-my-router">
        <div className="exp-15-sider">
          <a href="#page1">Page 1</a>
          <a href="#page2">Page 2</a>
          <a href="#page3">Page 3</a>
          <a href="#page4">Page 4</a>
        </div>
        <div className="exp-15-page-container">
          <MyRouter>
            <Route path="page1" component={Page1} />
            <Route path="page2" component={Page2} />
            <Route path="page3" component={Page3} />
            <Route path="page4" component={Page4} />
          </MyRouter>
        </div>
      </div>
    </>
  );
};
