import React from "react";
import useSWR from "swr";

// a fake API that returns data or error randomly
const fetchCurrentTime = async () => {
  // wait for 1s
  await new Promise((res) => setTimeout(res, 1000));

  // error!
  if (Math.random() < 0.4) {
    console.log('error============')
    throw new Error("An error has occurred!");
  }

  // return the data
  return new Date().toLocaleString();
};

export default function App() {
  const { data, error, mutate, isValidating } = useSWR(
    "/api",
    fetchCurrentTime,
    { 
      dedupingInterval: 0, // 删除一段时间内相同 key 的重复请求（以毫秒为单位）
      errorRetryCount: 3
    }
  );

  return (
    <div className="App">
      <button onClick={() => mutate()}>
        <span>Refresh</span>
      </button>
      <p>Loading: {isValidating ? "......" : "false"}</p>
      <h2>Current time: {data}</h2>
      {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
    </div>
  );
}
