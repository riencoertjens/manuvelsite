import React from 'react'
import ReactMarkdown from 'react-markdown'

import { pxToRem } from '../../webhart-components'
import { GridItem, GeneratePosts } from '../components'

import css from '@emotion/css'
import { colors, fonts } from '../../../site/styles'

const borderRadius = 7.5 //px

export const ContentSection = ({
  data,
  section,
  instaPostCounter,
  maxLikes,
}) => (
  <React.Fragment>
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
        color: ${section.gold ? 'black' : colors.gold};
        background: ${section.gold ? colors.realGold : 'black'};
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
          color: ${section.gold ? colors.grey : colors.lightGrey};
          margin-bottom: 0;
        `}
      >
        <ReactMarkdown>{section.contentNL}</ReactMarkdown>
      </p>
      <p
        css={css`
          font-style: italic;
        `}
      >
        <ReactMarkdown>{section.contentEN}</ReactMarkdown>
      </p>
    </GridItem>
  </React.Fragment>
)
