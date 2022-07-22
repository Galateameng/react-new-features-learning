import React, { memo, useEffect } from 'react'

import SuspenseCode from '!!raw-loader!./examples/01.Suspense'
import BbtchingCode from '!!raw-loader!./examples/02.batching'
import useIdCode from '!!raw-loader!./examples/03.useId'
import transitionCode from '!!raw-loader!./examples/04.transition'
import useDeferredValueCode from '!!raw-loader!./examples/05.useDeferredValue'


const codeMap = {
  Suspense: SuspenseCode,
  batching: BbtchingCode,
  useId: useIdCode,
  transition: transitionCode,
  useDeferredValue: useDeferredValueCode,
}

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
