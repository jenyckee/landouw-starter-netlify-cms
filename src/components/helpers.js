import React from 'react'

export const format = (text) => {
  if (text && text.split)
    const formatted = text.split(`\n\n`).map(paragraph => `<p>${paragraph.replace(/\n/g, `<br>`)}</p>`).join(``)
  else return
    <p>{text}</p>
  return <div dangerouslySetInnerHTML={{ __html: formatted }} />
}