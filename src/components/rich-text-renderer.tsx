type LexicalNode = {
  type?: string
  text?: string
  children?: unknown[]
}

const isNode = (value: unknown): value is LexicalNode => typeof value === 'object' && value !== null

const readText = (nodes?: unknown[]): string =>
  nodes
    ?.map((node) => {
      if (!isNode(node)) return ''
      if (node.text) return node.text
      if (node.children) return readText(node.children)
      return ''
    })
    .join(' ')
    .trim() || ''

export function RichTextRenderer({ content }: { content: { root?: { children?: unknown[] } } | null | undefined }) {
  const nodes = content?.root?.children || []

  if (nodes.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 text-slate-700">
      {nodes.map((node, index) => {
        if (!isNode(node)) return null
        const text = node.text || readText(node.children)

        if (!text) return null

        if (node.type === 'heading') {
          return (
            <h2 key={index} className="text-2xl font-semibold text-slate-950">
              {text}
            </h2>
          )
        }

        return (
          <p key={index} className="text-base leading-8">
            {text}
          </p>
        )
      })}
    </div>
  )
}
