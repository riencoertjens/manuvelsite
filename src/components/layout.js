import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StaticQuery, graphql } from 'gatsby'

import { Global } from '@emotion/core'
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
              siteMetadata {
                siteTitle
                siteTagline
              }
            }
          }
        `}
        render={data => (
          <>
            <Global styles={globalStyle} />
            <SEO
              title={`${data.site.siteMetadata.siteTitle} | ${
                data.site.siteMetadata.siteTagline
              }`}
            />

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
