import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import {
  Hero,
  Section,
  ScrollArrow,
  pxToRem,
  OutboundLink,
} from '../components/webhart-components'
import GatsbyImage from 'gatsby-image'
import css from '@emotion/css'
import styled from '@emotion/styled-base'
import LogoSVG from '../images/svg/logo.svg'
import { colors, fonts } from '../site/styles'

const squareSize = 75 //px
//https://codepen.io/balazs_sziklai/pen/mOwoLg
const GridWrap = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${pxToRem(squareSize)}, 1fr));
  grid-gap: ${props => props.gap || pxToRem(10)};
  padding: ${props => props.gap || pxToRem(10)};
  grid-auto-rows: minmax(${pxToRem(squareSize)}, auto);
  grid-auto-flow: dense;
`

const GridItem = styled('div')`
  overflow: hidden;
  ${props =>
    props.size && props.size.constructor === Array
      ? `
      grid-column-end: span ${props.size[0]};
      grid-row-end: span ${props.size[1]};
    `
      : `
      grid-column-end: span ${props.size};
      grid-row-end: span ${props.size};
    `}
`

const InstaPost = ({ post, maxLikes }) => {
  const size = Math.round((post.likes / maxLikes) * 2)

  const sizedImages = [
    post.image.childImageSharp.small || false,
    post.image.childImageSharp.medium || false,
    post.image.childImageSharp.large || false,
  ]
  const image = sizedImages[size]
  return (
    <GridItem
      as={OutboundLink}
      href={`https://instagram.com/p/${post.id}`}
      size={size + 1}
      css={css`
        background: ${colors.realGold};
        color: white;
        position: relative;
        border-radius: ${pxToRem(5)};
        * {
          transition: 0.5s;
        }
        .gatsby-image-wrapper {
          img {
            filter: grayscale(1);
          }
          /* filter: grayscale(0.66); 
          ::before,
          ::after {
            transition: 0.5s;
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            z-index: 10;
          }
          ::before {
            background: ${colors.realGold};
            mix-blend-mode: color-burn;
          } */
          /* ::after {
            background: white;
            mix-blend-mode: soft-light;
          } */
        }
        span {
          top: 100%;
        }
        :hover {
          .gatsby-image-wrapper {
            filter: unset;
            img {
              filter: unset;
            }
            ::after,
            ::before {
              opacity: 0;
            }
          }
          /* span {
            top: 0;
          } */
        }
      `}
    >
      <GatsbyImage
        fluid={image}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      <span
        css={css`
          /* white-space: nowrap; */
          transition: 0.2s;
          text-overflow: ellipsis;
          z-index: 1;
          position: absolute;
          left: 0;
          height: 100%;
          width: 100%;
          font-size: ${pxToRem(12)};
          padding: ${pxToRem(5)};
          background: rgba(0, 0, 0, 0.5);
          :after {
            content: 'read more...';
            padding: ${pxToRem(5)};
            width: 100%;
            padding-top: 40%;
            background: linear-gradient(transparent, black, black);
            position: absolute;
            bottom: 0;
            left: 0;
          }
        `}
      >
        {post.caption}
      </span>
    </GridItem>
  )
}

const IndexPage = ({ data }) => {
  let instaPostCounter = 0
  const maxLikes = data.maxLikes.edges[0].node.likes
  return (
    <Layout>
      <Hero
        height={75}
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
        <div
          css={css`
            margin-top: auto;
          `}
        >
          <img
            alt="logo"
            src={LogoSVG}
            css={css`
              height: 50vh;
              max-width: 85%;
            `}
          />
          {/* <h1>Manuvel</h1> */}
        </div>
        <ScrollArrow
          color={colors.gold}
          style={css`
            margin-top: auto;
          `}
        />
      </Hero>
      <Section
        background={colors.grey}
        css={css`
          padding: 0;
        `}
      >
        <GridWrap gap={pxToRem(5)}>
          {data.sections.edges.map(({ node: section }, key) => {
            let newInstaPosts = []
            for (let i = 0; i < 6; i++) {
              if (data.instaPosts.edges.length > instaPostCounter) {
                newInstaPosts.push(
                  <InstaPost
                    post={data.instaPosts.edges[instaPostCounter].node}
                    key={i}
                    maxLikes={maxLikes}
                  />
                )
              }
              instaPostCounter++
            }
            return (
              <React.Fragment key={key}>
                {newInstaPosts}
                <GridItem
                  size={section.size}
                  css={css`
                    color: ${section.isGold ? 'black' : colors.gold};
                    background: ${section.isGold ? colors.realGold : 'black'};
                    padding: ${pxToRem(20)};
                    border-radius: ${pxToRem(5)};
                    h2 {
                      font-size: ${pxToRem(60)};
                      border-bottom: 1px solid;
                      margin-bottom: ${pxToRem(10)};
                    }
                    p {
                      margin-bottom: ${pxToRem(10)};
                    }
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                  `}
                >
                  <h2>{section.title}</h2>
                  <p
                    css={css`
                      font-family: ${fonts.logo};
                      letter-spacing: -0.013rem;
                      text-transform: uppercase;
                    `}
                  >
                    {section.tagline}
                  </p>
                  <p>{section.content}</p>
                </GridItem>
              </React.Fragment>
            )
          })}
          {data.instaPosts.edges.map(({ node: post }, key) => {
            if (key >= instaPostCounter) {
              return <InstaPost post={post} key={key} maxLikes={maxLikes} />
            } else return null
          })}
        </GridWrap>
      </Section>
    </Layout>
  )
}

export default IndexPage

export const IndexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        siteTitle
        siteTagline
        siteDescription
      }
    }
    sections: allSectionsJson(sort: { fields: order, order: ASC }) {
      edges {
        node {
          order
          size
          isGold
          title
          tagline
          content
        }
      }
    }
    headerImage: file(base: { eq: "social-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
      ...SEOImageFragment
    }
    maxLikes: allInstaNode(limit: 1, sort: { fields: likes, order: DESC }) {
      edges {
        node {
          likes
        }
      }
    }
    instaPosts: allInstaNode(
      # limit: 300
      sort: { fields: timestamp, order: DESC }
    ) {
      edges {
        node {
          id
          likes
          comments
          original
          timestamp
          caption
          image: localFile {
            childImageSharp {
              small: fluid(
                maxWidth: 120
                maxHeight: 120
                traceSVG: { color: "black" }
              ) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
              medium: fluid(
                maxWidth: 240
                maxHeight: 240
                traceSVG: { color: "black" }
              ) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
              large: fluid(
                maxWidth: 480
                maxHeight: 480
                traceSVG: { color: "black" }
              ) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`
