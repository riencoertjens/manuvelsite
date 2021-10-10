import React from 'react'

import { Hero, ScrollArrow } from '../../webhart-components'

import GatsbyImage from 'gatsby-image'
import css from '@emotion/css'
import LogoSVG from '../../../images/svg/logo.svg'
import { colors } from '../../../site/styles'
import GatsbyLink from 'gatsby-link'
import PAGES from '../../../site/pages'

export const HeroSection = ({ data, path }) => (
  <Hero
    height={75}
    color="white"
    css={css`
      color: white;
      background: rgba(0, 0, 0, 0.66);
      align-items: stretch;
    `}
  >
    {PAGES.filter((page) => page.path !== path).map((page) => (
      <GatsbyLink
        to={page.path}
        css={css`
          z-index: 10;
          position: fixed;
          background: ${colors.realGold};
          padding: 0.5rem 1rem;
          border-bottom-left-radius: 12px;
          top: 0;
          right: 0;
          color: black;
        `}
      >
        Check out Manuvèl {page.name}
      </GatsbyLink>
    ))}

    <GatsbyImage
      fluid={
        data.location.childMarkdownRemark.frontmatter.header_image
          .childImageSharp.fluid
      }
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
)
