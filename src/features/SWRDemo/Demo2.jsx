import useSWR from "swr";

const subscribeToLog = () => {
  let log = [];
  let logIndex = 0;

  setInterval(() => {
    log.push(`${logIndex}: ${Date.now()}`);
    log = log.slice(-3);
    logIndex++;
  }, 100);

  return () => {
    return log;
  };
};

const logListener = subscribeToLog();

const Logger = () => {
  const { data } = useSWR("log", logListener, {
    refreshInterval: 1000,
    dedupingInterval: 1000,
  });

  return (
    <ul>
      {data?.map((line, index) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
};

export default Logger;
