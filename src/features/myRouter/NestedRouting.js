import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

const Page1 = () => {
  return (
    <div className="exp-15-page1">
      <div className="exp-15-page1-header">
        <Link to="/NestedRouting/page1/general">General</Link>
        <Link to="/NestedRouting/page1/profile">Profile</Link>
        <Link to="/NestedRouting/page1/settings">Settings</Link>
      </div>
      <div className="exp-15-page1-content">
        <Routes>
          <Route path="/NestedRouting/page1/general">General Page</Route>
          <Route path="/NestedRouting/page1/profile">Profile Page</Route>
          <Route path="/NestedRouting/page1/settings">Settings Page</Route>
        </Routes>
      </div>
    </div>
  );
};
const Page2 = () => "Page 2";
const Page3 = () => "Page 3";

export default () => {
  return (
    <BrowserRouter>
      <h1>Nested Routing</h1>
      <div className="exp-15-nested-routing">
        <div className="exp-15-sider">
          <Link to="/NestedRouting/page1">Page 1</Link>
          <Link to="/NestedRouting/page2">Page 2</Link>
          <Link to="/NestedRouting/page3">Page 3</Link>
        </div>
        <div className="exp-15-page-container">
          <Routes>
            <Route path="/NestedRouting/page1" element={<Page1 />} />
            <Route path="/NestedRouting/page2" element={<Page2 />} />
            <Route path="/NestedRouting/page3" element={<Page3 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
