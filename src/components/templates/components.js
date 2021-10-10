import React from 'react'
import { pxToRem, OutboundLink } from '../../components/webhart-components'

import GatsbyImage from 'gatsby-image'
import css from '@emotion/css'
import styled from '@emotion/styled-base'
import { colors } from '../../site/styles'

const squareSize = 100 //px
const borderRadius = 7.5 //px

//https://codepen.io/balazs_sziklai/pen/mOwoLg
export const GridWrap = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${pxToRem(squareSize)}, 1fr));
  grid-gap: ${(props) => props.gap || pxToRem(10)};
  padding: ${(props) => props.gap || pxToRem(10)};
  grid-auto-rows: minmax(${pxToRem(squareSize)}, auto);
  grid-auto-flow: dense;
`

export const GridItem = styled('div')`
  overflow: hidden;
  ${(props) => `
      grid-column-end: span ${props.width || 1};
      grid-row-end: span ${props.height || 1};
    `}
  @media (max-width: ${(props) => props.width * squareSize}px) {
    grid-column: 1/-1;
  }
`

export const InstaPost = ({ post, maxLikes }) => {
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
    </GridItem>
  )
}

export const GeneratePosts = ({ posts, count, counter, maxLikes }) => {
  return (
    <>
      {posts.slice(counter, counter + count).map((post) => (
        <InstaPost post={post.node} key={post.id} maxLikes={maxLikes} />
      ))}
    </>
  )
}
