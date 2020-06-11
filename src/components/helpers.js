import React from 'react'

export const format = (text) => {
  if (text && text.split) {
    const formatted = text.split(`\n\n`).map(paragraph => `<p>${paragraph.replace(/\n/g, `<br>`)}</p>`).join(``)
    return <div dangerouslySetInnerHTML={{ __html: formatted }} />
  } 
  return (<p>{text}</p>)
}