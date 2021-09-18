import { useCallback } from 'react'

import useBio from './useBio'
import { useWallet } from 'use-wallet'

import { unstake, getScienTistContract } from '../bio/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const bio = useBio()
  const scienTistContract = getScienTistContract(bio)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(scienTistContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, bio],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
