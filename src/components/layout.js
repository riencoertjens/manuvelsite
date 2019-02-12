import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StaticQuery, graphql } from 'gatsby'

import { Global, css } from '@emotion/core'
import SEO from './webhart-components/SEO'

// import LogoSVG from '../images/logo.svg'
// import LogoNegSVG from '../images/logo-neg.svg'

import { globalStyle } from './webhart-components'

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
