import { useCallback } from 'react'

import useBio from './useBio'
import { useWallet } from 'use-wallet'

import { stake, getScienTistContract } from '../bio/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const bio = useBio()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getScienTistContract(bio),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, bio],
  )

  return { onStake: handleStake }
}

export default useStake
