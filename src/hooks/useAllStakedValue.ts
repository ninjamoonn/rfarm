import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getScienTistContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../bio/utils'
import useBio from './useBio'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bio = useBio()
  const farms = getFarms(bio)
  const scienTistContract = getScienTistContract(bio)
  const wethContact = getWethContract(bio)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            scienTistContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, scienTistContract, bio])

  useEffect(() => {
    if (account && scienTistContract && bio) {
      fetchAllStakedValue()
    }
  }, [account, block, scienTistContract, setBalance, bio])

  return balances
}

export default useAllStakedValue
