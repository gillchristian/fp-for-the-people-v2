import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`
  text-align: left;
  font-size: 32px;
  & > div {
    margin-bottom: 20px;
  }
`

const Small = styled.span`
  font-size: 26px;
`

const Entry = ({ link, title, twitter, user }) => (
  <div>
    <a href={link}>{title}</a>
    {' '}
    <Small>
      by{' '}
      @<a href={twitter}>{user}</a>
    </Small>
  </div>
)

const Referenes = () => (
  <Styled>

    <Entry
      link="https://github.com/MostlyAdequate/mostly-adequate-guide"
      title="Professor Frisby's Mostly Adequate Guide to Functional Programming"
      twitter="https://twitter.com/drboolean"
      user="Brian Lonsdorf"
    />

    <Entry
      link="https://rauchg.com/2015/pure-ui"
      title="Pure UI"
      twitter="https://twitter.com/rauchg"
      user="Guillermo Rauch"
    />

    <Entry
      link="https://www.youtube.com/watch?v=xsSnOQynTHs"
      title="Hot Reloading with Time Travel"
      twitter="https://twitter.com/dan_abramov"
      user="Dan Abramov"
    />

    <Entry
      link="https://fsharpforfunandprofit.com/fppatterns/"
      title="Functional Programming Design Patterns"
      twitter="https://twitter.com/ScottWlaschin"
      user="Scott Wlaschin"
    />
  </Styled>
)

export default Referenes
