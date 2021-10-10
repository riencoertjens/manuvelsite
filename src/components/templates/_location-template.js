import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/layout'
import {
  Section,
  pxToRem,
  OutboundLink,
} from '../../components/webhart-components'
import { GridWrap, GridItem, InstaPost, GeneratePosts } from './components'

import css from '@emotion/css'
import WebhartLogo from '../../images/Logo'
import { colors } from '../../site/styles'

import MailchimpForm from '../../components/MailchimpForm'
import { Contact } from './sections/contact'
import { HeroSection } from './sections/hero'
import { ContentSection } from './sections/content'

const borderRadius = 7.5 //px

const LocationTemplate = ({ data, path, ...props }) => {
  let instaPostCounter = 0
  const maxLikes = data.maxLikes.edges[0].node.likes

  const sections = data.sections.nodes

  return (
    <Layout>
      <HeroSection data={data} path={path} />
      <Section
        background={colors.grey}
        css={css`
          padding: 0;
        `}
      >
        <GridWrap gap={pxToRem(5)}>
          {sections.map(
            ({ childMarkdownRemark: { frontmatter: section } }, key) => {
              return (
                <ContentSection
                  data={data}
                  section={section}
                  instaPostCounter={instaPostCounter}
                  maxLikes={maxLikes}
                />
              )
            }
          )}
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
          <Contact data={data} path={path} />
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
              color: #ff8c00; //${colors.gold};
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
              span {
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
              return <InstaPost post={post} key={post.id} maxLikes={maxLikes} />
            } else return null
          })}
        </GridWrap>
      </Section>
    </Layout>
  )
}

export const LocationTemplateQuery = graphql`
  query LocationTemplateQuery($sections: [String], $location: String) {
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
      }
    }
    location: file(
      relativeDirectory: { eq: "locations" }
      name: { eq: $location }
    ) {
      childMarkdownRemark {
        frontmatter {
          title
          header_image {
            childImageSharp {
              fluid(maxWidth: 1800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          opening_hours {
            day
            hours
            extra
          }
          address {
            street
            city
            post_code
            coordinates {
              lat
              lng
            }
          }
          sections
        }
      }
    }
    sections: allFile(
      filter: { relativeDirectory: { eq: "sections" }, name: { in: $sections } }
    ) {
      nodes {
        name
        childMarkdownRemark {
          frontmatter {
            title
            tagline
            height
            width
            gold
            contentNL
            contentEN
          }
        }
      }
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
                ...GatsbyImageSharpFluid
              }
              medium: fluid(
                maxWidth: 240
                maxHeight: 240
                traceSVG: { color: "black" }
              ) {
                ...GatsbyImageSharpFluid
              }
              large: fluid(
                maxWidth: 360
                maxHeight: 360
                traceSVG: { color: "black" }
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default LocationTemplate
