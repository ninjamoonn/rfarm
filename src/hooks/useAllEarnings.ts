import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getScienTistContract, getFarms } from '../bio/utils'
import useBio from './useBio'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bio = useBio()
  const farms = getFarms(bio)
  const scienTistContract = getScienTistContract(bio)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(scienTistContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, scienTistContract, bio])

  useEffect(() => {
    if (account && scienTistContract && bio) {
      fetchAllBalances()
    }
  }, [account, block, scienTistContract, setBalance, bio])

  return balances
}

export default useAllEarnings
