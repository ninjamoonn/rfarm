import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getScienTistContract } from '../bio/utils'
import useBio from './useBio'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const bio = useBio()
  const scienTistContract = getScienTistContract(bio)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(scienTistContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, bio])

  useEffect(() => {
    if (account && bio) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, bio])

  return balance
}

export default useStakedBalance
