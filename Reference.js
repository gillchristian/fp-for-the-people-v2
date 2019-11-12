import React from 'react'
import styled from 'styled-components'

// TODO: get size from theme (for responsiveness)
const Styled = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;

  font-size: 28px;
`

const Reference = ({ href, reference, author }) => 
  <Styled>
    <i>
      <a href={href} target="_blank" rel="noopener noreferrer">{reference}</a>
    </i>{reference && author ? ', ' : ''}{author}
  </Styled>

export default Reference
