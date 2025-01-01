import React from 'react'
import { Helmet } from 'react-helmet'
import './bootstrap.css'
import './index.css'

import { withPrefix } from 'gatsby'
import useSiteMetadata from './SiteMetadata'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon.ico`}
          sizes="32x32"
        />

        <meta content="restaurant grill tea-room sfeervol tafelen kindvriendelijk terras speeltuin" name="keywords"></meta>
        <meta content="LANDOUW Restaurant - grill - tea-room!  Een plaats waar het origineel mag zijn." name="description"></meta>
        <meta content="nl" name="LANGUAGE"></meta>

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
      </Helmet>
      <div>{children}</div>
    </div>
  )
}

export default TemplateWrapper
