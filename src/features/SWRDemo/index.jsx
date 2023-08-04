import React, { Component } from 'react'
import { Sandpack } from "@codesandbox/sandpack-react";
import DemoCode from '!!raw-loader!./Demo'
import DemoCode1 from '!!raw-loader!./Demo1'
import DemoCode2 from '!!raw-loader!./Demo2'
import DemoCode3 from '!!raw-loader!./Demo3'
import DemoCode4 from '!!raw-loader!./Demo4'
import DemoCode5 from '!!raw-loader!./Demo5'

import Demo from './Demo'
import Demo1 from './Demo1'
import Demo2 from './Demo2'
import Demo3 from './Demo3'
import Demo4 from './Demo4'
import Demo5 from './Demo5'



import './styles.less'

const sandPackProps = {
  template:"react",
  theme: 'dark',
  customSetup:{
    dependencies: { 
      "swr": "^1.3.0",
    },
  },
  options: {
    showConsole: true,
    showConsoleButton: true,
    editorHeight: 600
  }
}

const demos = [
  {
    code: DemoCode,
    title: 'loading error data'
  },
  {
    code: DemoCode1,
    title: '数据依赖'
  },
  {
    code: DemoCode2,
    title: 'Logger-'
  },
  {
    code: DemoCode3,
    title: 'StopWatch'
  },
  {
    code: DemoCode4,
    title: 'Global state'
  },
  {
    code: DemoCode5,
    title: 'Promise'
  },
]

class SWRDemo extends Component {
  render() {
    return (
     
      <div className="swrWrap">
        <h1>SWR</h1>
        <hr />
        <br />
        {demos.map(demo => (
          <div key={demo.title} style={{marginTop: 20}}>
            <h3>{demo.title}</h3>
            <Sandpack {...sandPackProps} files={{ '/App.js': demo.code, }}/>
          </div>
        ))}
        {/* <Demo /> */}
        {/* <Demo1 /> */}
          {/* <Demo2 /> */}
        {/* <Demo3 /> */}
        {/* <Demo4 /> */}
        {/* <Demo5 />  */}
      </div>
    )
  }
}

export default SWRDemo