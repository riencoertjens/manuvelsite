import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import {
  Hero,
  Section,
  ScrollArrow,
  pxToRem,
  OutboundLink,
  SocialLinks,
} from '../components/webhart-components'
import GoogleMap from '../components/webhart-components/Map'

import GatsbyImage from 'gatsby-image'
import css from '@emotion/css'
import styled from '@emotion/styled-base'
import LogoSVG from '../images/svg/logo.svg'
import WebhartLogo from '../images/Logo'
import { colors, fonts, mapStyle } from '../site/styles'
import Obfuscate from 'react-obfuscate'

import markerIcon from '../images/svg/mapmarker.svg'
import MailchimpForm from '../components/MailchimpForm'

const squareSize = 100 //px
const borderRadius = 7.5 //px

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
  ${props => `
      grid-column-end: span ${props.width || 1};
      grid-row-end: span ${props.height || 1};
    `}
  @media (max-width: ${props => props.width * squareSize}px) {
    grid-column: 1/-1;
  }
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
      width={size + 1}
      height={size + 1}
      css={css`
        background: ${colors.realGold};
        color: white;
        border-radius: ${pxToRem(borderRadius)};
        position: relative;

        .gatsby-image-wrapper {
          ::before,
          ::after {
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
            mix-blend-mode: hue;
          }
          ::after {
            background: #777;
            mix-blend-mode: overlay;
          }
          img {
            filter: brightness(0.66);
          }
        }
        span {
          top: 100%;
        }
        :hover {
          .gatsby-image-wrapper {
            img {
              filter: brightness(1);
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

      {/* <span
        css={css`
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
      </span> */}
    </GridItem>
  )
}

const GeneratePosts = ({ posts, count, counter, maxLikes }) => {
  for (let i = 0; i < count; i++) {
    if (posts.length > counter) {
      return (
        <InstaPost post={posts[counter].node} key={i} maxLikes={maxLikes} />
      )
    }
    counter++
  }
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
          {data.content.frontmatter.sections.map((section, key) => {
            return (
              <React.Fragment key={key}>
                <GeneratePosts
                  posts={data.instaPosts.edges}
                  count={4}
                  counter={instaPostCounter}
                  maxLikes={maxLikes}
                >
                  {(instaPostCounter += 4)}
                </GeneratePosts>
                <GridItem
                  width={section.width}
                  height={section.height}
                  css={css`
                    color: ${section.isGold ? 'black' : colors.gold};
                    background: ${section.isGold ? colors.realGold : 'black'};
                    padding: ${pxToRem(20)};
                    border-radius: ${pxToRem(borderRadius)};
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                  `}
                >
                  <h2>{section.title}</h2>
                  <p
                    css={css`
                      margin-bottom: ${pxToRem(10)};
                      font-family: ${fonts.logo};
                      letter-spacing: -0.013rem;
                      text-transform: uppercase;
                    `}
                  >
                    {section.tagline}
                  </p>
                  <p
                    css={css`
                      color: ${section.isGold ? colors.grey : colors.lightGrey};
                      margin-bottom: 0;
                    `}
                  >
                    {section.contentNL}
                  </p>
                  <p
                    css={css`
                      font-style: italic;
                    `}
                  >
                    {section.content}
                  </p>
                </GridItem>
              </React.Fragment>
            )
          })}
          <GeneratePosts
            posts={data.instaPosts.edges}
            count={4}
            counter={instaPostCounter}
            maxLikes={maxLikes}
          >
            {(instaPostCounter += 4)}
          </GeneratePosts>
          {/* register */}
          <GridItem
            height={3}
            width={3}
            css={css`
              color: ${colors.gold};
              background: black;
              padding: ${pxToRem(20)};
              border-radius: ${pxToRem(borderRadius)};
              display: flex;
              flex-direction: column;
              justify-content: center;
            `}
          >
            <h2>register</h2>
            <div>
              <MailchimpForm />
            </div>
          </GridItem>
          <GeneratePosts
            posts={data.instaPosts.edges}
            count={4}
            counter={instaPostCounter}
            maxLikes={maxLikes}
          >
            {(instaPostCounter += 4)}
          </GeneratePosts>
          {/* contact */}
          <GridItem
            width={7}
            height={3}
            css={css`
              background: black;
              color: ${colors.gold};
              border-radius: ${pxToRem(borderRadius)};
              display: flex;
              justify-content: space-evenly;
              flex-wrap: wrap;
            `}
          >
            <div
              css={css`
                padding: ${pxToRem(20)};
                flex: 1 0 ${pxToRem(squareSize * 3)};
                p {
                  margin-top: 0.75rem;
                  margin-bottom: 0;
                }
                td:nth-child(3),
                td:nth-child(4) {
                  text-align: right;
                  padding-left: 0.25rem;
                }
                h3 {
                  font-size: 1.5rem;
                }
              `}
            >
              <h2>contact</h2>
              <table>
                <tr>
                  <td>Tue-Fri</td>
                  <td>8h - 17h</td>
                  <td>breakfast</td>
                  <td>9h - 10h30</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>9h - 17h</td>
                  <td>lunch</td>
                  <td>12h - 14h</td>
                </tr>
                <tr
                  css={css`
                    height: 1rem;
                    td::after {
                      display: block;
                      content: '';
                      background: ${colors.gold};
                      width: 100%;
                      height: 1px;
                    }
                  `}
                >
                  <td colSpan={4} />
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>9h - 13h</td>
                  <td colSpan={2}>lazy breakfast until 12h</td>
                </tr>
                <tr
                  css={css`
                    height: 1rem;
                    td::after {
                      display: block;
                      content: '';
                      background: ${colors.gold};
                      width: 100%;
                      height: 1px;
                    }
                  `}
                >
                  <td colSpan={4} />
                </tr>
                <tr>
                  <td>Monday</td>
                  <td>rest day</td>
                  <td colSpan={2}>
                    +{' '}
                    <OutboundLink href="https://www.facebook.com/pg/manuvel.be/events/">
                      special events
                    </OutboundLink>
                  </td>
                </tr>
                <tr
                  css={css`
                    height: 1rem;
                    td::after {
                      display: block;
                      content: '';
                      background: ${colors.gold};
                      width: 100%;
                      height: 1px;
                    }
                  `}
                >
                  <td colSpan={2} />
                </tr>
              </table>

              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <p>
                  Stationsstraat 95
                  <br />
                  9100 Sint Niklaas
                </p>
                <p
                  css={css`
                    a {
                      display: block !important;
                      color: ${colors.gold};
                      text-align: left;
                    }
                  `}
                >
                  <Obfuscate tel="(+32)03/689.44.34" />
                  <Obfuscate email="info@manuvel.be" />
                </p>
              </div>
              <p>
                <SocialLinks
                  {...data.site.socials}
                  style={css`
                    color: ${colors.gold};
                    font-size: ${pxToRem(24)};
                  `}
                />
              </p>
            </div>
            {/* map */}
            <div
              css={css`
                background: ${colors.realGold};
                position: relative;
                flex: 1 0 ${pxToRem(squareSize * 3)};
                min-height: ${pxToRem(squareSize * 3)};
              `}
            >
              <GoogleMap
                apiKey={data.site.siteMetadata.mapsApiKey}
                location={data.site.siteMetadata.businessLocation}
                markerIcon={markerIcon}
                markerInfoComponent={
                  <OutboundLink
                    css={css`
                      color: ${colors.gold};
                    `}
                    href="https://www.google.com/maps/dir//Stationsstraat+95,+9100+Sint-Niklaas,+Belgium"
                  >
                    directions
                  </OutboundLink>
                }
                options={{
                  center: data.site.siteMetadata.businessLocation,
                  zoom: 15,
                  disableDefaultUI: true,
                  styles: mapStyle,
                }}
              />
            </div>
          </GridItem>
          <GeneratePosts
            posts={data.instaPosts.edges}
            count={4}
            counter={instaPostCounter}
            maxLikes={maxLikes}
          >
            {(instaPostCounter += 4)}
          </GeneratePosts>
          {/* webhart */}
          <GridItem
            height={1}
            width={1}
            as={OutboundLink}
            href="https://www.web-hart.com"
            css={css`
              background: ${colors.blue};
              color: #FF8C00;//${colors.gold};
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-evenly;
              border-radius: ${pxToRem(borderRadius)};
              text-decoration: none;
              svg {
                max-width: 85%;
                height: auto;
              }
              span{
                font-size: ${pxToRem(12)};
              }
            `}
          >
            <span>website by</span> <WebhartLogo />
          </GridItem>
          <GeneratePosts
            posts={data.instaPosts.edges}
            count={4}
            counter={instaPostCounter}
            maxLikes={maxLikes}
          >
            {(instaPostCounter += 4)}
          </GeneratePosts>
          {/* copy */}
          <GridItem
            height={1}
            width={6}
            css={css`
              background: black;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${colors.gold};
              border-radius: ${pxToRem(borderRadius)};
              a {
              }
            `}
          >
            <span>&copy; www.manuvel.be {new Date().getFullYear()}</span>
          </GridItem>
          {/* all remaining posts */}
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
        mapsApiKey
        businessLocation {
          lat
          lng
        }
        siteTitle
        siteTagline
        siteDescription
      }
      socials: siteMetadata {
        instagram: instagramUsername
        #twitter: twitterUsername
        #facebook: facebookPage
      }
    }
    content: markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
      frontmatter {
        title
        templateKey
        sections {
          title
          tagline
          isGold: gold
          width
          height
          content: contentEN
          contentNL
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
      limit: 100
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
                maxWidth: 360
                maxHeight: 360
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
