import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './couterSlice'
import CodeVIewer from '../../components/CodeViewer'
import reduxSliceCode from  '!!raw-loader!./couterSlice'

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <br />
      <p>
        redux 新写法:  <br />
        1. @reduxjs/toolkit, createSlice <br />
        2. immer <br />
      </p>
      <CodeVIewer code={reduxSliceCode} />
    </div>
  )
}