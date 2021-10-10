import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import css from '@emotion/css'
import { OutboundLink, pxToRem } from './webhart-components'
import { colors } from '../site/styles'

export default class MailchimpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { popUp: false }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    if (form.subscribe) {
      const email = e.target.email.value
      const listFields = {
        NAME: form.name.value,
        POSTCODE: form.zip.value,
      }
      addToMailchimp(email, listFields) // listFields are optional if you are only capturing the email address.
        .then((data) => {
          form.reset()
          // I recommend setting data to React state
          // but you can do whatever you want (including ignoring this `then()` altogether)
          this.setState({ popUp: data })
        })
        .catch(() => {
          // unnecessary because Mailchimp only ever
          // returns a 200 status code
          // see below for how to handle errors
        })
    }
  }

  render() {
    const { popUp } = this.state
    return (
      <>
        <form
          onSubmit={this.handleSubmit}
          css={css`
            display: flex;
            flex-direction: column;
            label,
            span {
              margin-bottom: 0.5rem;
            }
            label {
              display: flex;
              align-items: center;
              justify-content: space-between;
              input {
                color: ${colors.gold};
                padding: ${pxToRem(2)};
                border: 1px solid;
                background: ${colors.grey};
              }
            }
            button {
              background: ${colors.realGold};
              color: ${colors.grey};
              border: 1px solid;
            }
          `}
        >
          <label>
            name* <input name="name" type="text" required />
          </label>
          <label>
            email* <input name="email" type="email" required />
          </label>
          <label>
            postal code <input name="zip" type="text" />
          </label>
          <label
            css={css`
              font-size: ${pxToRem(14)};
              && {
                display: inline-block;
              }
            `}
          >
            <input name="subscribe" type="checkbox" required /> *I want to
            recieve updates about Manuvèl and agree that my information will be
            stored in{' '}
            <OutboundLink href="https://mailchimp.com/legal/">
              Mailchimp
            </OutboundLink>{' '}
            for processing. you can{' '}
            <OutboundLink href="https://manuvel.us20.list-manage.com/unsubscribe?u=92a4f0acc56fc60a2d717948f&id=cc0a5e7021">
              unsubscribe
            </OutboundLink>{' '}
            at any time
          </label>
          <button>submit</button>
        </form>
        {popUp && (
          <div
            css={css`
              position: fixed;
              width: 100vw;
              height: 100vh;
              top: 0;
              left: 0;
              display: flex;
              align-items: center;
              z-index: 10000;
              justify-content: center;
              background: rgba(0, 0, 0, 0.75);
            `}
          >
            <div //popup content
              css={css`
                position: fixed;
                background: ${colors.realGold};
                color: black;
                width: 300px;
                padding: ${pxToRem(5)} ${pxToRem(10)};
                text-align: center;

                a {
                  color: ${colors.grey};
                }
                button,
                p {
                  margin: ${pxToRem(5)};
                }
                button {
                  color: white;
                  border: none;
                  padding: ${pxToRem(2)} ${pxToRem(10)};
                  ${popUp.result === 'error' && `background: ${colors.red};`}
                  ${popUp.result === 'success' &&
                  `background: ${colors.green};`}
                }
                max-width: 90%;
                border-radius: ${pxToRem(15)};
              `}
            >
              <p>{popUp.result === 'error' && 'oops...'}</p>
              <p>{popUp.result === 'success' && 'success'}</p>
              <p dangerouslySetInnerHTML={{ __html: popUp.msg }} />
              <button onClick={() => this.setState({ popUp: false })}>
                ok
              </button>
            </div>
          </div>
        )}
      </>
    )
  }
}
