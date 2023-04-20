import React, { useMemo, useState, useTransition } from "react";
import Demo1 from "./components/Demo1";
import Demo2 from "./components/Demo2";

const DemoList = [
  { label: "Update优先级", component: Demo1 },
  { label: "demo2", component: Demo2 }
];

const ConcurrentModeDemo = () => {
  const [demo, setDemo] = useState(0);

  const Demo = useMemo(() => DemoList[demo].component, [demo]);

  return (
    <div>
      <h3>Concurrent Mode Demo</h3>
      <ul style={{padding: '20px 0', display: 'flex'}}>
        {DemoList.map((item, index) => (
          <li
            onClick={() => setDemo(index)}
            key={item.label}
            style={{
              color: `${demo === index ? "#f00" : "#000"}`,
              borderBottom: `${demo === index ? "1px solid #f00" : "none"}`,
              cursor: 'pointer',
              listStyle: 'inside',
              marginRight: 20
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div>{<Demo />}</div>
    </div>
  );
};

export default ConcurrentModeDemo