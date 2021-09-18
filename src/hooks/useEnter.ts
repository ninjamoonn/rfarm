import {useCallback} from 'react'

import useBio from './useBio'
import {useWallet} from 'use-wallet'

import {enter, getXBioStakingContract} from '../bio/utils'

const useEnter = () => {
  const {account} = useWallet()
  const bio = useBio()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXBioStakingContract(bio),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, bio],
  )

  return {onEnter: handle}
}

export default useEnter
