import React, { useMemo, useState, useTransition } from "react";
import Demo1 from "./components/Demo1";
import Demo2 from "./components/Demo2";
import CodeViewer from "./CodeViewer";
import Demo3 from "./components/Demo3";
import Demo4 from "./components/MessageChannel";

const DemoList = [
  { label: "Update优先级", component: Demo1 },
  { label: "demo2", component: Demo2 },
  { label: "Suspense", component: Demo3 },
  { label: "MessageChannel", component: Demo4 }
];

const ConcurrentModeDemo = () => {
  const [demoIndex, setDemoIndex] = useState(0);

  const Demo = useMemo(() => DemoList[demoIndex].component, [demoIndex]);

  return (
    <div>
      <h3>Concurrent Mode Demo</h3>
      <ul style={{padding: '20px 0', display: 'flex'}}>
        {DemoList.map((item, index) => (
          <li
            onClick={() => setDemoIndex(index)}
            key={item.label}
            style={{
              color: `${demoIndex === index ? "#f00" : "#000"}`,
              borderBottom: `${demoIndex === index ? "1px solid #f00" : "none"}`,
              cursor: 'pointer',
              listStyle: 'inside',
              marginRight: 20
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div style={{marginBottom: 20}}>{<Demo />}</div>
      <CodeViewer code={demoIndex} />
    </div>
  );
};

export default ConcurrentModeDemo