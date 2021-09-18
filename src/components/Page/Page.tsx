import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'
import mainLogo1 from '../../assets/img/mainLogo.png'


const Page: React.FC = ({ children }) => (
  <StyledPage>
    <StyledMain>{children}</StyledMain>
    <Footer />
  </StyledPage>
)

const StyledPage = styled.div`
 //background: url('hero.png') no-repeat center center fixed;
 `

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
`

export default Page
