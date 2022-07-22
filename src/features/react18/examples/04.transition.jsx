import { memo, useMemo, useState, useTransition } from "react";

/** mock data */
const getMockData = () => {
  const list = [];
  for (let i = 0; i < 100000; i++) {
    list.push(`test${i}`)
  }
  return list
}

const list = getMockData()


/** item */
function ListItem({ name, highlight }) {
  return <div style={{color:highlight && name.toLowerCase().includes(highlight.toLowerCase()) ? 'orange': 'gray'}}>{name}</div>;
}

const MemoListItem = memo(ListItem)


/** list */
export default function Demo () {
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState("");

  const [isPending, startTransition] = useTransition();

  const changeHandler = ({ target: { value } }) => {
    startTransition(() =>{ 
      setHighlight(value)
    });
    setQuery(value);
  };

  return (
    <div>
      <h3>Transition</h3>
      <br />

      <input onChange={changeHandler} value={query} type="text" />

      <div>
        {isPending ? 'isPending.....' : '--'}
      </div>

      <div style={{height: 500, overflow: 'auto', border: '1px solid #333'}}>
        {
          list.map((name, i) => (
            <MemoListItem key={i} name={name} highlight={highlight} />
          ))
        }
      </div>
    </div>
  );
}