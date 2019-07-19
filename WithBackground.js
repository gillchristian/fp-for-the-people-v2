import React from 'react'
import styled from 'styled-components'
// TODO: `@mdx-deck/components` module issue while with webpack loader
// import { useTheme } from '@mdx-deck/components'
import * as R from 'ramda'

const WithBackground = styled.div`
  background-image: url("${props => props.src}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: ${props => props.color};
`

export default WithBackground
