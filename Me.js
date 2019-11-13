import React from 'react'
import styled from 'styled-components'

import avatar from './images/avatar.png'

const Container = styled.div`
  display: flex;
  align-items: center;

  & > .name {
    line-height: 1;
    margin-left: 10px;
  }

  & a {
    text-decoration: none;
    cursor: pointer;
  }

  & img {
    width: 40px;
    height: 40px;

    display: inline;
    border-radius: 100%;
  }
`

const Me = () => (
  <Container>
    <img src={avatar} alt="avatar" />
    <div className="name">
      <a
        href="https://gillchristian.xyz/about-me"
        target="_blank"
        rel="noopener noreferrer"
      >
        Christian Gill
      </a>
      {' @ '}
      <a href="https://catawiki.com" target="_blank" rel="noopener noreferrer">
        Catawiki
      </a>
    </div>
  </Container>
)

export default Me
