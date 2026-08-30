import React from 'react'

const escapeHtml = (text = '') =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const formatInlineMarkdown = (text = '') => {
  const escaped = escapeHtml(text)
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
}

export const format = (text) => {
  if (text && text.split) {
    const formatted = text
      .split(/\n\s*\n/)
      .map(paragraph => {
        const trimmed = paragraph.trim()

        if (!trimmed) return ''

        const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/)
        if (headingMatch) {
          const level = headingMatch[1].length
          const content = formatInlineMarkdown(headingMatch[2])
          return `<h${level}>${content}</h${level}>`
        }

        return `<p>${formatInlineMarkdown(trimmed)}</p>`
      })
      .join('')

    return <div dangerouslySetInnerHTML={{ __html: formatted }} />
  }

  return <p>{text}</p>
}