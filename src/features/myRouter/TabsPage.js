import { useCallback } from "react";
import { Tabs, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import data from "./data";
import { useSearchParam } from "react-use";

const { TabPane } = Tabs;

export default () => {
  const { activeTab = "users" } = useParams();
  const page = parseInt(useSearchParam("page"), 10) || 1;
  const history = useNavigate();
  const handleTabChange = useCallback(
    (tab) => history.push(`/15/TabsPage/${tab}`),
    [history],
  );
  const pagination = {
    pageSize: 3,
    current: page,
    onChange: (p) => {
      history.push(`/15/TabsPage/${activeTab}?page=${p}`);
    },
  };
  return (
    <div>
      <h1>Tabs Page</h1>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Users" key="users">
          <Table
            dataSource={data}
            columns={[
              { dataIndex: "name", title: "User Name" },
              { dataIndex: "city", title: "City" },
            ]}
            pagination={pagination}
          />
        </TabPane>
        <TabPane tab="Jobs" key="jobs">
          <Table
            dataSource={data}
            columns={[{ dataIndex: "job", title: "Job Title" }]}
            pagination={pagination}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
