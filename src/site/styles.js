import css from '@emotion/css'
import styled from '@emotion/styled'

import GatsbyLink from 'gatsby-link'
import { getFonts, pxToRem } from '../components/webhart-components/functions'

import 'typeface-raleway'
import 'typeface-titillium-web'

import SimplificaFont from './fonts/Simplifica.woff'
import SimplificaFont2 from './fonts/Simplifica.woff2'

export const lineHeight = '1.5'
export const spacing = 1.5

export const DefaultPaddingX = '1rem'
export const DefaultPaddingY = 0

export const BreakPoints = ['600px', '900px', '1200px', '1600px']

export const baseFontSize = 16
export const responsiveFontSizes = ['14px', '16px', '16px', '16px', '18px']

export const colors = {
  blue: '#0B3954',
  red: '#6A041D',
  grey: '#222',
  green: '#0F554C',
  gold: '#DBBF77',
  realGold: 'linear-gradient(90deg, #B88746, #FDF5A6)',
}

export const fontFamilies = {
  body: ['Raleway', 'sans-serif'],
  title: ['Simplifica', 'sans-serif'],
  logo: ['"Titillium Web"', 'sans-serif'],
}
export const useTypography = true

export const typographySettings = {
  baseFontSize: baseFontSize[2],
  baseLineHeight: lineHeight,
  scaleRatio: 2.5,
  headerFontFamily: fontFamilies.title,
  headerWeight: 100,
  bodyFontFamily: fontFamilies.body,
}

export const fonts = getFonts(fontFamilies)

export const globalStyle = css`
  @font-face {
    font-family: 'Simplifica';
    src: url(${SimplificaFont}) format('woff2'),
      url(${SimplificaFont2}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  *::selection {
    color: black;
    text-shadow: 1px 1px 2px ${colors.gold}88;
    background: ${colors.gold};
  }
  h2 {
    font-size: ${pxToRem(60)};
    border-bottom: 1px solid;
    margin-bottom: ${pxToRem(10)};
  }
  blockquote {
    font-style: italic;
    span {
      font-style: normal;
      font-weight: 600;
    }
  }
`

export const Button = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: 0.2s;
  border: 2px solid;
  border-color: ${colors.blue};
  background: ${colors.blue};
  color: ${colors.yellow};
  display: inline-block;
  width: auto;
  height: auto;
  &:hover {
    color: ${colors.blue};
    background: ${colors.yellow};
    border-color: ${colors.yellow};
  }
  ${props => props.border && `border-color: ${colors.yellow};`}

  ${props =>
    props.alt &&
    `
      background: ${colors.yellow};
      color: ${colors.blue};
      border-color: ${props.border ? colors.blue : colors.yellow};
      &:hover {
        border-color: ${colors.blue};
        color: ${colors.yellow};
        background: ${colors.blue};
      }
    `}
`

export const mapStyle = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#dbbf78',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        weight: 2,
      },
    ],
  },
  {
    featureType: 'landscape',
    stylers: [
      {
        color: '#222222',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    stylers: [
      {
        color: '#000000',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels',
    stylers: [
      {
        color: '#929292',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    stylers: [
      {
        color: '#dbbf78',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        weight: 2,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#222222',
      },
      {
        weight: 2,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dbbf78',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        weight: 0.5,
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#515151',
      },
    ],
  },
]

export const ButtonLink = Button.withComponent('a')
export const ButtonGatsbyLink = Button.withComponent(GatsbyLink)
