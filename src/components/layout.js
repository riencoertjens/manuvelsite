import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StaticQuery, graphql } from 'gatsby'

import { Global, css } from '@emotion/core'
import SEO from './webhart-components/SEO'

// import LogoSVG from '../images/logo.svg'
// import LogoNegSVG from '../images/logo-neg.svg'

import { FaInstagram as InstagramIcon } from 'react-icons/fa'
import { FaTwitter as TwitterIcon } from 'react-icons/fa'
import { FaFacebookF as FacebookIcon } from 'react-icons/fa'
import { OutboundLink, globalStyle } from './webhart-components'

const SocialLinks = ({ instagram, facebook, twitter, css }) => (
  <>
    {instagram && (
      <OutboundLink
        aria-label="instagram"
        href={`https://instagram.com/${instagram}`}
        {...css}
      >
        <InstagramIcon />
      </OutboundLink>
    )}
    {twitter && (
      <OutboundLink
        aria-label="twitter"
        href={`https://twitter.com/${twitter}`}
      >
        <TwitterIcon />
      </OutboundLink>
    )}
    {facebook && (
      <OutboundLink
        aria-label="facebook"
        href={`https://facebook.com/${facebook}`}
      >
        <FacebookIcon />
      </OutboundLink>
    )}
  </>
)

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuActive: false,
    }
  }
  render() {
    const { children } = this.props
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              socials: siteMetadata {
                instagram: instagramUsername
                twitter: twitterUsername
                facebook: facebookPage
              }
            }
          }
        `}
        render={data => (
          <>
            <Global styles={globalStyle} />
            <SEO />
            <header css={css``}>
              <SocialLinks {...data.site.socials} />
            </header>
            <main>{children}</main>
          </>
        )}
      />
    )
  }
}

export default Layout

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
