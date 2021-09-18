import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/address/0xF3502718e750F529df90ab552DD20915A93fbEB0#code"
      >
        Scientist Contract |
      </StyledLink>
      <StyledLink target="_blank" href="https://telegram.me/biofarmapp">
        Telegram |
      </StyledLink>
		<StyledLink target="_blank" href="https://twitter.com/biofarm_">

        Twitter |

      </StyledLink> 
	
      <StyledLink target="_blank" href="https://github.com/biofarm1">
        Github |
      </StyledLink>
   
	<StyledLink target="_blank" href="https://medium.com/@biofarm">
        Medium
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  font-size: 12px;
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[1]}px;
  padding-right: ${(props) => props.theme.spacing[1]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
