import { memo, useMemo, useState, useDeferredValue } from "react";

/** mock data */
const getMockData = () => {
  const list = [];
  for (let i = 0; i < 50000; i++) {
    list.push(`test${i}`)
  }
  return list
}

const list = getMockData()


/** item */
function ListItem({ name }) {
  return <div>{name}</div>;
}

const MemoListItem = memo(ListItem)

function Demo () {
  const [query, setQuery] = useState("");


  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
  };

  const filterFun = (filter) => {
    let timer = Date.now();

    while( Date.now() - timer < 5000);
    // for (let i = 0; i < 100000000; i++) {
    // }
    if (!filter) {
      return list
    } else {
      return list.filter(item => item.includes(filter))
    }
  }

  const filterList = filterFun(query)
  const defferedList = useDeferredValue(filterList)

  return (
    <div>
      <h3>Transition</h3>
      <br />

      <input onChange={changeHandler} value={query} type="text" />

      <div style={{height: 500, overflow: 'auto', border: '1px solid #333'}}>
        {
          defferedList.map((name, i) => (
            <MemoListItem key={i} name={name} />
          ))
        }
      </div>
    </div>
  );
}

// 1. useDeferredValue only defers the value that you pass to it.
// 2. If you want to prevent a child component  from re-rendering during an urgent update, you must also memoize that component with React.memo or React.useMemo
export default memo(Demo)