import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import { ThemeProvider } from 'styled-components'
import Home from '../components/Home'
import Layout from '../components/Layout'
import { Theme } from './theme'

export const IndexPageTemplate = ({
  image,
  title,
  info,
  about,
  menus,
  hours,
  sluiting
}) => (
  <div>
    <ThemeProvider theme={Theme}>
      <Home 
        intro={!!image.childImageSharp ? image.childImageSharp.fluid.src : image}
        info={info} 
        menus={menus} 
        about={about}
        sluiting={sluiting}
        hours={hours}/>
    </ThemeProvider>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        about={frontmatter.about}
        info={frontmatter.info}
        menus={frontmatter.menus}
        hours={frontmatter.hours}
        sluiting={frontmatter.sluiting}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        about
        menus {
          options {
            title
            text
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        info
        hours
        sluiting {
          day
        }
      }
    }
  }
`
