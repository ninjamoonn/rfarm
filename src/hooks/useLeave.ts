import {useCallback} from 'react'

import useBio from './useBio'
import {useWallet} from 'use-wallet'

import {leave, getXBioStakingContract} from '../bio/utils'

const useLeave = () => {
  const {account} = useWallet()
  const bio = useBio()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXBioStakingContract(bio),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, bio],
  )

  return {onLeave: handle}
}

export default useLeave
