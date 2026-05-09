'use client'

import {
  RichText as PayloadRichText,
  LinkJSXConverter,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'

interface RichTextProps {
  content: unknown
}

export function RichTextRenderer({ content }: RichTextProps) {
  const globalStyles: React.CSSProperties = {
    fontFamily: '"DM Sans", Arial, sans-serif',
    fontWeight: 400,
    color: '#61615f',
    fontSize: '22px',
    lineHeight: '35px',
    textAlign: 'justify',
  }

  if (!content || typeof content !== 'object') {
    return null
  }

  const hasRoot = 'root' in content

  if (!hasRoot) {
    return null
  }

  const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref: () => '#' }),
  })

  return (
    <div style={globalStyles} className="rich-text-content">
      <PayloadRichText
        converters={jsxConverters}
        data={content as never}
      />
    </div>
  )
}