import React, { useState, useTransition } from "react";

export default function Demo2() {
  const [count, updateCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    // 试试不作为startTransition回调执行
    startTransition(() => {
      updateCount((count) => count + 1);
    });
  };

  return <h3 onClick={onClick}>{count}</h3>;
}
