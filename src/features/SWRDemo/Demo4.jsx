import useSWR from "swr";

const useSWRGlobalState = (key, initialData) => {
  const { data, mutate } = useSWR(key, () => initialData);
  return [
    data ?? initialData,
    (value) =>
      mutate(value, {
        revalidate: false,
      }),
  ];
};

const StateEditor = () => {
  const [value, setValue] = useSWRGlobalState("sharedText", "");

  return (
    <input value={value} onChange={(evt) => setValue(evt.target.value)} />
  );
};

const StateViewer = () => {
  const [value] = useSWRGlobalState("sharedText", "");

  return <div>{value}</div>;
};

const GlobalStateDemo = () => {
  return (
    <div>
      <StateEditor />
      <StateViewer />
    </div>
  );
};

export default GlobalStateDemo;
