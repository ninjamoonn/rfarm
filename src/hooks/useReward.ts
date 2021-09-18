import { useCallback } from 'react'

import useBio from './useBio'
import { useWallet } from 'use-wallet'

import { harvest, getScienTistContract } from '../bio/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const bio = useBio()
  const scienTistContract = getScienTistContract(bio)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(scienTistContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, bio])

  return { onReward: handleReward }
}

export default useReward
