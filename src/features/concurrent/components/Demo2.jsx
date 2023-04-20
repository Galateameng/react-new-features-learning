import React from "react";

export default function Demo2() {
  const len = 5000

  return (
    <ul>
      {Array(len).fill(0).map((_, i) => <li key={i}>{i}</li>)}
    </ul>
  )
}
