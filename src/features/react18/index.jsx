import React, { useEffect, useState, useTransition } from 'react';
import './style.scss';

import SuspenseDemo from './examples/01.Suspense'
import Batching from './examples/02.batching'
import UseIdDemo from './examples/03.useId'
import TransitionDemo from './examples/04.transition'
import UseDeferredValueDemo from './examples/05.useDeferredValue'

import CodeViewer from './CodeViewer';
import { map } from 'lodash';


const routeMap = {
  useId: <UseIdDemo />,
  transition: <TransitionDemo />,
  useDeferredValue: <UseDeferredValueDemo />,
  Suspense: <SuspenseDemo />,
  // batching: <Batching />,
}


function Layout() {
  const [activeKey, setActiveKey] =  useState('useId')
  const [Component, setComponent] = useState(<UseIdDemo />)
  const [isPending, startTransition] = useTransition();


  return (
    <div className='demo-wrap'>
      <div className='demo-nav'>
        {
         map(routeMap, (Comp, key) => (
            <span 
              onClick={() => {
                setActiveKey(key)
                // setComponent(Comp)
                startTransition(() => setComponent(Comp))
              }}
              key={key}
              className={activeKey === key ? 'active' : ''}
            >
              {key}
            </span>
          ))
        }
      </div>
      <div style={{minHeight: 350}}>{isPending ? 'loading component .....' : Component}</div>
      <br />
      <div><CodeViewer code={activeKey} /></div>
    </div>
  );
}

function Demos() {
  return (
    <div>
      <h1>React 18</h1>
      <Layout />
    </div>
  )
}

export default Demos