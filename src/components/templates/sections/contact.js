import GatsbyLink from 'gatsby-link'
import React from 'react'

import {
  OutboundLink,
  SocialLinks,
  pxToRem,
} from '../../../components/webhart-components'
import GoogleMap from '../../../components/webhart-components/Map'
import { GridItem } from '../components'

import css from '@emotion/css'
import Obfuscate from 'react-obfuscate'
import PAGES from '../../../site/pages'
import { colors, mapStyle } from '../../../site/styles'

import markerIcon from '../../../images/svg/mapmarker.svg'

const squareSize = 100 //px
const borderRadius = 7.5 //px

export const Contact = ({ data, path }) => {
  console.log(data)
  return (
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
        <table
          css={css`
            border-collapse: collapse;
          `}
        >
          <tbody>
            {data.location.childMarkdownRemark.frontmatter.opening_hours &&
              data.location.childMarkdownRemark.frontmatter.opening_hours.map(
                (hours, key) => (
                  <>
                    <tr
                      key={`${key}${hours.day}`}
                      css={
                        !hours.extra &&
                        css`
                          td {
                            border-bottom: 1px solid;
                          }
                        `
                      }
                    >
                      <td>{hours.day}</td>
                      <td
                        css={css`
                          text-align: right;
                        `}
                      >
                        {hours.hours}
                      </td>
                    </tr>
                    {hours.extra && (
                      <tr
                        key={key}
                        css={css`
                          td {
                            border-bottom: 1px solid;
                          }
                        `}
                      >
                        <td></td>
                        <td
                          css={css`
                            text-align: right;
                          `}
                        >
                          {hours.extra}
                        </td>
                      </tr>
                    )}
                  </>
                )
              )}
          </tbody>
        </table>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <p>
            {data.location.childMarkdownRemark.frontmatter.address.street}
            <br />
            {
              data.location.childMarkdownRemark.frontmatter.address.post_code
            }{' '}
            {data.location.childMarkdownRemark.frontmatter.address.city}
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
            {data.location.childMarkdownRemark.frontmatter.email && (
              <Obfuscate
                email={data.location.childMarkdownRemark.frontmatter.email}
              />
            )}
          </p>
        </div>
        <div
          css={css`
            margin: 2rem 0 0 0;
            display: flex;
            justify-content: space-between;
          `}
        >
          <SocialLinks
            instagram={data.location.childMarkdownRemark.frontmatter.instagram}
            style={css`
              color: ${colors.gold};
              font-size: ${pxToRem(24)};
            `}
          />
          {PAGES.filter((page) => page.path !== path).map((page) => (
            <GatsbyLink to={page.path}>
              Looking for Manuvèl {page.name}?
            </GatsbyLink>
          ))}
        </div>
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
          location={
            data.location.childMarkdownRemark.frontmatter.address.coordinates
          }
          markerIcon={markerIcon}
          markerInfoComponent={
            <OutboundLink
              css={css`
                color: ${colors.gold};
              `}
              href={`https://www.google.com/maps/dir//${data.location.childMarkdownRemark.frontmatter.address.street},+${data.location.childMarkdownRemark.frontmatter.address.post_code}+${data.location.childMarkdownRemark.frontmatter.address.city},+Belgium`}
            >
              directions
            </OutboundLink>
          }
          options={{
            center:
              data.location.childMarkdownRemark.frontmatter.address.coordinates,
            zoom: 15,
            disableDefaultUI: true,
            styles: mapStyle,
          }}
        />
      </div>
    </GridItem>
  )
}
