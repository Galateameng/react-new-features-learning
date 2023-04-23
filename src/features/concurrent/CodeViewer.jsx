import React, { memo, useEffect } from 'react'

import Demo1 from '!!raw-loader!./components/Demo1'
import Demo2 from '!!raw-loader!./components/Demo2'
import Demo3 from '!!raw-loader!./components/Demo3'
import Demo4 from '!!raw-loader!./components/MessageChannel'

const codeMap = [
  Demo1,
  Demo2,
  Demo3,
  Demo4
]

const CodeViewer =  ({ code }) => {
  useEffect(() => {
   window.Prism.highlightAll()
  }, [code])
  return (
    <pre>
      <code className="language-jsx line-numbers">
        {codeMap[code] || `// Error: code not found`}
      </code>
    </pre>
  )
}

export default memo(CodeViewer)
