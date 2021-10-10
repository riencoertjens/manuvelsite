import React from 'react'
import GatsbyImage from 'gatsby-image'
import css from '@emotion/css'
import GatsbyLink from 'gatsby-link'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import { Hero } from '../components/webhart-components'

import LogoSVG from '../images/svg/logo.svg'
import { colors } from '../site/styles'
import PAGES from '../site/pages'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexPageQuery {
      headerImage: file(
        base: { eq: "social-image.jpg" } # sourceInstanceName: { eq: "images" }
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
          <img
            alt="logo"
            src={LogoSVG}
            css={css`
              height: 50vh;
              max-width: 85%;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            * + * {
              margin: 1rem;
            }
          `}
        >
          {PAGES.map((page) => (
            <GatsbyLink
              to={page.path}
              css={css`
                background: ${colors.realGold};
                padding: 0.5rem 1rem;
                border-bottom-left-radius: 12px;
                border-top-right-radius: 12px;
                color: black;
              `}
            >
              Go To Manuvèl {page.name}
            </GatsbyLink>
          ))}
        </div>
      </Hero>
    </Layout>
  )
}

export default IndexPage
