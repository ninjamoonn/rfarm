import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
	  bioLink?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title, bioLink }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
	  <StyledSubtitle>&nbsp;</StyledSubtitle>
	   
	{/*  <StyledLink target="_blank" href="https://biolabs.app">
        Learn More
      </StyledLink>*/}

	  <Button href={bioLink} size="sm" text="Learn More" />

      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  width: 120px;
`

const StyledTitle = styled.h1`
  font-family: 'Kaushan Script', sans-serif;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledLink = styled.a`
  font-size: 16px;
  color: ${(props) => "#ff33cc"};
  padding-left: ${(props) => props.theme.spacing[1]}px;
  padding-right: ${(props) => props.theme.spacing[1]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default PageHeader
