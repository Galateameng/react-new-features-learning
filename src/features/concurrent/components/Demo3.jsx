import React, { Suspense, useState, useTransition } from "react";
import { wrapFunction } from "../utils";

function fetchTime () {
  return wrapFunction(
    new Promise(resolve => {
      setTimeout(() => {
        resolve({time: new Date().toLocaleString()})
      }, 1000)
    })
  )
}

const Clock = ({resource}) => {
  const {time} = resource.read()
  return <h3>{time}</h3>
}

const Button = ({onClick, children}) => {
  const [isPending, startTransition] = useTransition({timeoutMs: 2000})

  const onBtnClick = () => {
    startTransition(() => {
      onClick()
    })
  }

  return (
    <>
      <button onClick={onBtnClick}>{children}</button>
      <span>{isPending && 'loading...'}</span>
    </>
  )
}

export default function Demo3() {
  const [time, setTime] = useState(fetchTime())


  const load = () => {
    setTime(fetchTime())
  }

  return (
    <Suspense fallback={<div>loading</div>}>
      <Button onClick={load}>加载</Button>
      <Clock resource={time} />
    </Suspense>
  )
}
