import { memo, useEffect } from "react"

const CodeViewer =  ({ code }) => {
  useEffect(() => {
   window.Prism.highlightAll()
  }, [code])
  return (
    <pre>
      <code className="language-jsx line-numbers">
        {code || `// Error: code not found`}
      </code>
    </pre>
  )
}

export default memo(CodeViewer)