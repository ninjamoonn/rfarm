import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useBio from '../../hooks/useBio'
import {getContract} from '../../utils/erc20'
import UnstakeXBio from './components/UnstakeXBio'
import StakeBio from "./components/StakeBio";

import {contractAddresses} from '../../bio/lib/constants'
import {getXBioSupply} from "../../bio/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";

const StakeXBio: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xBio[1],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const bio = useBio()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXBioSupply(bio)
      setTotalSupply(supply)
    }
    if (bio) {
      fetchTotalSupply()
    }
  }, [bio, setTotalSupply])



  const lpContract = useMemo(() => {
    //debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXBio
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakeBio
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ You will earn a portion of the swaps fees based on the amount
              of xBio held relative the weight of the staking. xBio can be minted
              by staking Bio. To redeem Bio staked plus swap fees convert xBio
              back to Bio. {totalSupply ? `There are currently ${getBalanceNumber(totalSupply)} xBIO in existence.` : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeXBio
