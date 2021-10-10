import React from 'react'
import GatsbyImage from 'gatsby-image'
import css from '@emotion/css'
import GatsbyLink from 'gatsby-link'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import { Hero } from '../components/webhart-components'

import { colors } from '../site/styles'

const ComingSoonPage = () => {
  const data = useStaticQuery(graphql`
    query ComingSoonPageQuery {
      headerImage: file(
        base: { eq: "coming-soon.jpg" } # sourceInstanceName: { eq: "images" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1800) {
            ...GatsbyImageSharpFluid
          }
        }
        ...SEOImageFragment
      }
    }
  `)

  return (
    <Layout>
      <Hero
        height={100}
        color="white"
        css={css`
          color: white;
          background: rgba(0, 0, 0, 0.66);
          align-items: stretch;
        `}
      >
        <GatsbyImage
          fluid={data.headerImage.childImageSharp.fluid}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        />

        <div>
          <h1
            css={css`
              font-size: 64px;
              color: ${colors.gold};
              padding: 32px;
            `}
          >
            Coming Soon
          </h1>
          <GatsbyLink
            to="/classic"
            css={css`
              background: ${colors.realGold};
              padding: 0.5rem 1rem;
              border-bottom-left-radius: 12px;
              border-top-right-radius: 12px;
              color: black;
            `}
          >
            Go To Manuvèl (Sint-Niklaas)
          </GatsbyLink>
        </div>
      </Hero>
    </Layout>
  )
}

export default ComingSoonPage
