import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getScienTistContract } from '../bio/utils'
import useBio from './useBio'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const bio = useBio()
  const scienTistContract = getScienTistContract(bio)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(scienTistContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, scienTistContract, bio])

  useEffect(() => {
    if (account && scienTistContract && bio) {
      fetchBalance()
    }
  }, [account, block, scienTistContract, setBalance, bio])

  return balance
}

export default useEarnings
