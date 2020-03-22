/** @jsx jsx */
import React from 'react'
import { css, jsx, Global } from '@emotion/core'

export default function App() {
  const [booleans, setBooleansState] = React.useState([])
  const combos = getAllCombos(booleans)
  const setBooleans = list => {
    setBooleansState([...new Set(list)])
  }
  return (
    <React.Fragment>
      <Global
        styles={css`
          body {
            /* background-color: #32827F; */
            background-color: #041a19;
            color: #e9e9eb;
            font-family: sans-serif;
            margin: 0 auto;
            max-width: calc(100vw - 2em);
            padding: 0;
            width: 500px;
          }
          a {
            color: #4992db;
          }
          a:focus {
            outline-color: #4992db;
          }
          a:visited {
            color: #9d7dbe;
          }
          a:visited:focus {
            outline-color: #9d7dbe;
          }
          button {
            cursor: pointer;
          }
          #root {
            display: grid;
            grid-template-rows: 1fr auto;
            min-height: 100vh;
          }
        `}
      />
      <main>
        <h1 css={{ textAlign: `center` }}>Booleans and Exponential Growth</h1>
        <p>
          Use the input below to add names of boolean properties, look at the
          output below to see how many combinations can be made.{' '}
          <a href="https://kyleshevlin.com/enumerate-dont-booleanate" target="_blank" rel="noopener noreferrer">
            Kyle Shevlin has a great article on why this is important in
            application state.
          </a>
        </p>
        <ul
          css={{
            backgroundColor: `#7cafad`,
            color: `#160f29`,
            listStyle: `none`,
            padding: 0,
            '& > li:nth-child(odd)': {
              backgroundColor: `#448d8a`,
            },
          }}
        >
          {booleans.map((bool, idx) => (
            <li
              css={{
                alignItems: `center`,
                display: `grid`,
                gridColumnGap: `0.125em`,
                gridTemplateColumns: `1fr auto`,
                padding: `0.25em 0.375em 0.25em 0.625em`,
              }}
            >
              <span css={{ wordBreak: `break-all` }}>{bool}</span>
              <button
                type="button"
                onClick={() => {
                  const copy = [...booleans]
                  copy.splice(idx, 1)
                  setBooleans(copy)
                }}
                aria-label={`Remove ${bool}`}
                css={{
                  backgroundColor: `transparent`,
                  border: `none`,
                  color: `#2B243C`,
                  fontSize: `2em`,
                  height: 42,
                  padding: 0,
                  width: 42,
                }}
              >
                <span
                  aria-hidden="true"
                  css={{
                    position: `relative`,
                    '&::after': {
                      bottom: 1.5,
                      content: `"✖"`,
                      color: `#E92918`,
                      padding: `inherit`,
                      position: `absolute`,
                      right: 1.5,
                    },
                  }}
                >
                  ✖
                </span>
              </button>
            </li>
          ))}
        </ul>
        <form
          onSubmit={evt => {
            evt.preventDefault()
            if (!evt.target.boolean.value) return
            setBooleans([...booleans, evt.target.boolean.value])
            evt.target.boolean.value = ``
          }}
          css={{
            display: `grid`,
            gridTemplateColumns: `1fr auto`,
          }}
        >
          <input
            type="text"
            name="boolean"
            placeholder="Add an item"
            autoComplete="off"
            aria-label="Add an item"
            css={{
              backgroundColor: `#e9e9eb`,
              border: `none`,
              borderRadius: `5px 0 0 5px`,
              borderRight: `none`,
              fontSize: `1em`,
              padding: `0.375em 0.5em`,
            }}
          />
          <button
            type="submit"
            css={{
              backgroundColor: booleans.length % 2 ? `#7cafad` : `#448d8a`,
              border: `none`,
              borderLeft: `1px solid #041a19`,
              borderRadius: `0 5px 5px 0`,
              fontSize: `1em`,
              fontWeight: `bold`,
              padding: `0.5em 1em`,
              textTransform: `uppercase`,
            }}
          >
            Add
          </button>
        </form>
        <strong css={{ display: `block`, marginTop: `2.5em` }}>
          {combos.length} possible states
        </strong>
        {booleans.length ? (
          <ul
            css={{
              backgroundColor: `#7cafad`,
              color: `#160f29`,
              listStyle: `none`,
              padding: 0,
              '& > li:nth-child(odd)': {
                backgroundColor: `#448d8a`,
              },
            }}
          >
            {combos.map(combo => (
              <li
                css={{
                  padding: `0.5em`,
                }}
              >
                <ul
                  css={{
                    listStyle: `none`,
                    padding: 0,
                  }}
                >
                  {combo.map(item => (
                    <li
                      css={{
                        padding: `0.25em`,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : null}
      </main>
      <footer
        css={{
          fontSize: `0.85em`,
          lineHeight: `1.5em`,
          margin: `3em 0 2em`,
          textAlign: `center`,
        }}
      >
        Made by <a href="https://twitter.com/_estewart" target="_blank" rel="noopener noreferrer">Ethan Stewart</a>.
        Inspired by{' '}
        <a href="https://twitter.com/kyleshevlin/status/1240776323519283200" target="_blank" rel="noopener noreferrer">
          Kyle Shevlin
        </a>
        . Code on{' '}
        <a href="https://github.com/StewartEthan/boolean-growth" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </footer>
    </React.Fragment>
  )
}

function getAllCombos(booleans) {
  const table = getBooleanTable(booleans.length)
  return table.map(row => row.map((value, idx) => `${booleans[idx]}: ${value}`))
}
// Credit to Kyle Shevlin: https://gist.github.com/kyleshevlin/39e4e213e2c057a97684b1b9c38ebcd1
function getBooleanTable(number) {
  if (number <= 0) return []
  return Array(Math.pow(2, number))
    .fill()
    .map((_, idx) => idx)
    .map(num => num.toString(2).padStart(number, '0'))
    .map(stringOfBits =>
      stringOfBits.split('').map(bit => Boolean(parseInt(bit, 10))),
    )
}
